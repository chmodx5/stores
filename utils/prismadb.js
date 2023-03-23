const { PrismaClient } = require("@prisma/client");

// Create a new Prisma Client instance
const prisma = new PrismaClient();
//check if the prisma instance is already defined

module.exports = prisma;
