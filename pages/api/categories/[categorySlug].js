import prisma from "../../../utils/prismadb";
import Joi from "joi";
import fs from "fs";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    console.log(req.query);
    const { categorySlug } = req.query;
    console.log(req.query);

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
