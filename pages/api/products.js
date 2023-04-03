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

async function getProducts(req, res) {
  // check if the http method is GET
  if (req.method == "GET") {
    const store = req.query.store;
    const category = req.query.category;
    const brand = req.query.brand;
    const q = req.query.q;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    const skip = (page - 1) * perPage;

    let products = [];
    let totalProducts = 0;
    let totalPages = 0;

    //check if a store is provided
    if (store) {
      const checkIfStoreExists = await prisma.store.findUnique({
        where: {
          slug: store,
        },
      });

      if (!checkIfStoreExists) {
        return res.status(404).json({
          message: "store not found",
        });
      }
    }
    totalProducts = await prisma.product.count({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
        store: {
          slug: store,
        },
        brand: {
          slug: brand,
        },
        category: {
          slug: category,
        },
      },
    });

    totalPages = Math.ceil(totalProducts / perPage);

    products = await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
        store: {
          slug: store,
        },
        brand: {
          slug: brand,
        },
        category: {
          slug: category,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        thumbnail: true,
        discountPrice: true,
        stock: true,
        brand: {
          select: {
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      skip: skip || 0,
      take: perPage || 10,
    });

    return res.status(200).json({
      products: products,
      totalPages: totalPages,
      totalProducts: totalProducts,
      currentPage: page,
    });
  }
}

export default async function handler(req, res) {
  // check if the http method is GET
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);

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
        uploadDir: "./public/uploads/products",
      });

      form.keepExtensions = true;
      form.keepFileName = true;

      form.on("fileBegin", function (name, file) {
        // console.log(name);
        file.path =
          form.uploadDir +
          `/${name == "productThumbnail" ? "thumbnails/" : "images/"}` +
          slugify(file.name);
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    // console.log(data.files);

    const name = data.fields.productName;
    const description = data.fields.productDescription;
    const stock = data.fields.productStock;
    const category = data.fields.productCategory;
    const brand = data.fields.productBrand;
    const price = data.fields.productPrice;
    const discountPrice = data.fields.productDiscountPrice || 0;

    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      description: Joi.string().min(3).max(255).required(),
      stock: Joi.number().min(0).required(),
      category: Joi.string().min(3).max(255).required(),
      brand: Joi.string().max(255).required(),
      price: Joi.number().min(0).required(),
      discountPrice: Joi.number(),
    });

    const { error } = schema.validate({
      name: name,
      description: description,
      stock: parseInt(stock),
      category: category,
      brand: brand,
      price: parseInt(price),
      discountPrice: discountPrice,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        status: "failed",
        success: false,
      });
    }

    const chechIfProductExists = await prisma.product.findUnique({
      where: {
        name: name,
      },
    });

    if (chechIfProductExists) {
      return res.status(400).json({
        message: "A product with that name already exists",
        status: "failed",
        success: false,
      });
    }

    const checkIfCategoryExists = await prisma.category.findUnique({
      where: {
        slug: category,
      },
    });

    if (!checkIfCategoryExists) {
      return res.status(404).json({
        message: "category not found",
        status: "failed",
        success: false,
      });
    }

    const checkIfBrandExists = await prisma.brand.findUnique({
      where: {
        slug: brand,
      },
    });

    if (!checkIfBrandExists) {
      return res.status(404).json({
        message: "brand not found",
        status: "failed",
        success: false,
      });
    }

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

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        status: "failed",
        success: false,
      });
    }

    if (!user.accounts[0].store) {
      return res.status(404).json({
        message: "store not found",
        status: "failed",
        success: false,
      });
    }

    const thumbnail = data.files.productThumbnail.path.replace("./public", "");

    const images = data.files.productImages.map((image) => {
      return image.path.replace("./public", "");
    });
    const slug = slugify(name);

    try {
      await prisma.product.create({
        data: {
          name: name,
          slug: slug,
          description: description,
          stock: parseInt(stock),
          price: parseInt(price),
          discountPrice: parseInt(discountPrice) || 0,
          thumbnail: thumbnail,
          images: images.join(","),
          categoryId: checkIfCategoryExists.id,
          brandId: checkIfBrandExists.id,
          userId: user.id,
          storeId: user.accounts[0].store.id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "someting went wrong",
        status: "failed",
        success: false,
      });
    }

    return res.status(200).json({
      message: "product created successfully",
      status: "success",
      success: true,
    });
  }
  if (req.method == "GET") {
    getProducts(req, res);
  }
}
