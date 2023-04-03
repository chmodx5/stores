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
    const data = await new Promise((resolve, reject) => {
      const form = formidable({
        multiples: true,
        uploadDir: "./public/uploads/categories",
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

    const name = data.fields.categoryName;
    const description = data.fields.categoryDescription;

    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(400),
    });

    const { error } = schema.validate({
      name: name,
      description: description,
    });

    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }

    //check if the category exists
    const checkIfCategoryExists = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (checkIfCategoryExists) {
      return res.status(422).json({
        message: "Category already exists",
        status: "failed",
        success: false,
      });
    }

    //create the category
    const slug = slugify(name);

    //get the user
    const session = await getServerSession(req, res, authOptions);
    // console.log(session);
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

    console.log(user);

    try {
      await prisma.category.create({
        data: {
          name: name,
          description: description,
          slug: slug,
          image: data.files.categoryImage.path,
          createdBy: {
            connect: {
              id: user.accounts[0].userId,
            },
          },
          stores: {
            connect: {
              id: user.accounts[0].store.id,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        status: "failed",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category created successfully",
      status: "success",
      success: true,
    });
  }
  if (req.method === "DELETE") {
    console.log(req.query);
    const { categorySlug } = req.query;

    const schema = Joi.object({
      categorySlug: Joi.string().required(),
    });

    const { error } = schema.validate({
      categorySlug: categorySlug,
    });

    if (error) {
      return res.status(422).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }

    //check if the category exists
    const checkIfCategoryExists = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

    if (!checkIfCategoryExists) {
      return res.status(422).json({
        message: "Category does not exist",
        status: "failed",
        success: false,
      });
    }

    //delete the category
    try {
      await prisma.category.delete({
        where: {
          slug: categorySlug,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        status: "failed",
        success: false,
      });
    }

    const categories = await prisma.category.findMany({
      where: {
        stores: {
          every: {
            slug: categorySlug,
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        products: {
          select: {
            id: true,
          },
        },
        stores: {
          select: {
            slug: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Category deleted successfully",
      status: "success",
      success: true,
      data: categories,
    });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
