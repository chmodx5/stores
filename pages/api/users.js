import prisma from "../../utils/prismadb";
import Joi from "joi";
import fs from "fs";
import multer from "multer";
import formidable from "formidable-serverless";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const isAuthenticated = session ? true : false;
  if (req.method == "GET") {
    if (!isAuthenticated) {
      return res.status(402).json({
        message: "user not authenticated",
        status: "failed",
        success: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        accounts: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(402).json({
        message: "user not found",
        status: "failed",
        success: false,
      });
    }

    return res.status(200).json({
      message: "found user",
      status: "success",
      success: true,
      data: user,
    });
  }
  if (req.method == "POST") {
    return res.status(200).json({
      message: "you have reached here wow!",
      status: "success",
      success: false,
    });
  }
  return res.status(400).json({
    message: "method not allowed",
    status: "failed",
    success: false,
  });
}
