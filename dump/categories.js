import prisma from "../../utils/prismadb";
import Joi from "joi";
import fs from "fs";
import multer from "multer";
import formidable from "formidable-serverless";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function createCategory(req, res) {
  // const categoryName = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return res.status(401).json({
      session: session,
    });
  }

  //   const userEmail = session.user.email;

  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: userEmail,
  //     },
  //   });

  //   //get the formdata from the request and console.log it
  //   let form = new formidable.IncomingForm();
  //   form.uploadDir = "public/uploads/products";
  //   form.keepExtensions = true;
  //   form.keepFileName = true;

  //   form.on("fileBegin", function (name, file) {
  //     file.path = form.uploadDir + "/" + slugify(file.name);
  //   });

  //   form.parse(req, async function (err, fields, files) {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ error: "Something went wrong" });
  //       return;
  //     }

  //     const name = fields.categoryName;
  //     const description = fields.categoryDescription;

  //     //   console.log(files);

  //     const schema = Joi.object({
  //       name: Joi.string().min(3).max(30).required(),
  //       description: Joi.string().min(3).max(30),
  //     });

  //     const { error } = schema.validate({
  //       name: name,
  //       description: description,
  //     });

  //     if (error) {
  //       return res.status(422).json({
  //         message: error.details[0].message,
  //         status: "failed",
  //         success: false,
  //       });
  //     } else {
  //       const checkIfCategoryExists = await prisma.category.findUnique({
  //         where: {
  //           name: name,
  //         },
  //       });

  //       console.log(checkIfCategoryExists);

  //       if (checkIfCategoryExists) {
  //         return res.status(400).json({
  //           message: "Category already exists",
  //         });
  //       } else {
  //         const slug = slugify(name);

  //         try {
  //           await prisma.category.create({
  //             data: {
  //               name: name,
  //               description: description,
  //               slug: slug,
  //               image: files.categoryImage.path,
  //             },
  //           });

  //           await prisma.store.update({
  //             where: {
  //               userId: user.id,
  //             },
  //             data: {
  //               categories: {
  //                 connect: {
  //                   id: category.id,
  //                 },
  //               },
  //             },
  //           });
  //         } catch (err) {
  //           console.log(err);
  //         }

  //         console.log("category");
  //       }
  //     }
  //   });
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({
        session: session,
      });
    }

    const userEmail = session.user.email;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    let form = new formidable.IncomingForm();
    form.uploadDir = "public/uploads/products";
    form.keepExtensions = true;
    form.keepFileName = true;

    form.on("fileBegin", function (name, file) {
      file.path = form.uploadDir + "/" + slugify(file.name);
    });

    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong" });
      }

      const name = fields.categoryName;
      const description = fields.categoryDescription;

      //   console.log(files);

      const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(30),
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

      return res.status(200).json({ h: "tjhdfgdhgf" });
      //   if (error) {
      //     return res.status(422).json({
      //       message: error.details[0].message,
      //       status: "failed",
      //       success: false,
      //     });
      //   } else {
      //     const checkIfCategoryExists = await prisma.category.findUnique({
      //       where: {
      //         name: name,
      //       },
      //     });

      //     if (checkIfCategoryExists) {
      //       return res.status(400).json({
      //         message: "Category already exists",
      //       });
      //     } else {
      //       const slug = slugify(name);

      //       try {
      //         const category = await prisma.category.create({
      //           data: {
      //             name: name,
      //             description: description,
      //             slug: slug,
      //             image: files.categoryImage.path,
      //           },
      //         });

      //         await prisma.store.update({
      //           where: {
      //             userId: user.id,
      //           },
      //           data: {
      //             categories: {
      //               connect: {
      //                 id: category.id,
      //               },
      //             },
      //           },
      //         });
      //       } catch (err) {
      //         console.log(err);
      //       }

      //       console.log("category");
      //     }
      //   }
    });

    return;
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
