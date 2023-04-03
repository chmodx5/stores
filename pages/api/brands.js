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
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    const data = await new Promise((resolve, reject) => {
      const form = formidable({
        multiples: true,
        uploadDir: "./public/uploads/brands",
      });

      form.keepExtensions = true;
      form.keepFileName = true;

      form.on("fileBegin", function (name, file) {
        file.path = form.uploadDir + "/" + slugify(file.name);
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    const name = data.fields.brandName;

    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
    });

    const { error } = schema.validate({
      name: name,
    });

    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }

    //check if the category exists
    const checkIfBrandExists = await prisma.brand.findUnique({
      where: {
        name: name,
      },
    });

    if (checkIfBrandExists) {
      return res.status(422).json({
        message: "Brand already exists",
        status: "failed",
        success: false,
      });
    }

    //create the brand

    const slug = slugify(name);

    //get the user
    // return;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: {
          include: {
            store: true,
          },
        },
      },
    });

    try {
      await prisma.brand.deleteMany();
      await prisma.brand.create({
        data: {
          name: name,
          slug: slug,
          image: data.files.brandImage.path,
          createdBy: {
            connect: {
              id: user.id,
            },
          },
          store: {
            connect: {
              id: user.accounts[0].store.id,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        status: "failed",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Brand created successfully",
      status: "success",
      success: true,
    });
  }

  if (req.method === "DELETE") {
    const { brandSlug } = req.query;
    const { storeSlug } = req.query;

    const schema = Joi.object({
      brandSlug: Joi.string().min(3).max(50).required(),
    });

    const { error } = schema.validate({
      brandSlug: brandSlug,
    });

    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }
    const checkIfBrandExists = await prisma.brand.findUnique({
      where: {
        slug: brandSlug,
      },
    });

    if (!checkIfBrandExists) {
      return res.status(404).json({
        message: "Brand does not exist",
        status: "failed",
        success: false,
      });
    }

    //delete the brand
    try {
      await prisma.brand.delete({
        where: {
          slug: brandSlug,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        status: "failed",
        success: false,
      });
    }

    const brands = await prisma.brand.findMany({
      where: {
        products: {
          some: {
            store: {
              slug: storeSlug,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        products: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        products: {
          _count: "desc",
        },
      },
      take: 15,
    });

    return res.status(200).json({
      message: "Brand deleted successfully",
      status: "success",
      success: true,
      data: brands,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
