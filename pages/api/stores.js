import prisma from "../../utils/prismadb";
import Joi from "joi";
import fs from "fs";
import multer from "multer";
import formidable from "formidable-serverless";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method == "POST") {
    if (!session) {
      return res.status(401).json({
        message: "unauthorized",
        status: "failed",
        success: false,
      });
    }

    const data = await new Promise((resolve, reject) => {
      const form = formidable({
        multiples: true,
        uploadDir: "./public/uploads/stores/logo",
      });

      form.keepExtensions = true;
      form.keepFileName = true;

      form.on("fileBegin", function (name, file) {
        file.path =
          form.uploadDir + "/" + slugify(file.name) + "-" + Date.now();
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    const name = data.fields.name;
    const description = data.fields.description;
    const location = data.fields.location;
    const email = data.fields.email;
    const phone = data.fields.phone;
    const whatsappPhone = data.fields.whatsappPhone;
    const address = data.fields.address;

    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(400),
      location: Joi.string().min(3).max(400),
      email: Joi.string().min(3).max(400),
      phone: Joi.string().min(3).max(400),
      whatsappPhone: Joi.string().min(3).max(400),
      address: Joi.string().min(3).max(400),
    });

    const { error } = schema.validate({
      name: name,
      description: description,
      location: location,
      email: email,
      phone: phone,
      whatsappPhone: whatsappPhone,
      address: address,
    });

    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }

    try {
      await prisma.store.deleteMany();
      console.log("deleted stores");
    } catch (error) {
      console.log(error);
    }

    const checkIfStoreExists = await prisma.store.findUnique({
      where: {
        name: name,
      },
    });

    if (checkIfStoreExists) {
      return res.status(422).json({
        message: "store already exists",
        status: "failed",
        success: false,
      });
    }

    const logo = data.files.logo.path.replace("./public", "");
    const slug = slugify(name);

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(422).json({
        message: "user not found",
        status: "failed",
        success: false,
      });
    }

    const createStore = await prisma.store.create({
      data: {
        name: name,
        slug: slug,
        description: description,
        location: location,
        logo: logo,
        storeEmail: email,
        storePhoneNumber: phone,
        whatsappPhone: whatsappPhone,
        address: address,
        accountId: user.accounts[0].id,
      },
    });

    if (!createStore) {
      return res.status(422).json({
        message: "store creation failed",
        status: "failed",
        success: false,
      });
    }

    try {
      //craete user settings
      await prisma.userSettings.deleteMany({});
      await prisma.userSettings.create({
        data: {
          activeAccountId: createStore.accountId,
          userId: user.id,
          promptedToCreateStore: true,
        },
      });
      //create store settings
      await prisma.storeSettings.deleteMany({});
      await prisma.storeSettings.create({
        data: {
          storeId: createStore.id,
        },
      });

      // create account settings
      await prisma.accountSettings.deleteMany({});
      await prisma.accountSettings.create({
        data: {
          accountId: createStore.accountId,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const store = await prisma.store.findUnique({
      where: {
        id: createStore.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        location: true,
        logo: true,
        storeEmail: true,
        storePhoneNumber: true,
        whatsappPhone: true,
        account: {
          include: {
            store: true,
            user: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "store created successfully",
      status: "success",
      success: true,
      data: store,
    });
  }

  return res.status(405).json({
    message: "method not allowed",
    status: "success",
    success: true,
  });
}
