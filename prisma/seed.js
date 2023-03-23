const prisma = require("./../utils/prismadb.js");
const { faker } = require("@faker-js/faker");

async function generateCategories(numberOfCategories, deleteItems) {
  if (deleteItems) {
    try {
      await prisma.category.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
  const users = await prisma.user.findMany();
  const stores = await prisma.store.findMany();
  let newCategories = [];

  for (let i = 0; i < numberOfCategories; i++) {
    let randomPlaceholder = Math.floor(Math.random() * 1000);
    let name = faker.commerce.department() + " " + randomPlaceholder;
    let slug = name.toLowerCase().replace(/ /g, "-");

    newCategories.push({
      name: name,
      slug: slug,
      description: faker.lorem.paragraph(),
      storeIds: stores[0].id,
      createdById: users[0].id,
    });
  }

  const createCategories = await prisma.category.createMany({
    data: newCategories,
  });
}

async function generateBrands(numberOfBrands, deleteItems) {
  if (deleteItems) {
    try {
      await prisma.brand.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
  const users = await prisma.user.findMany();
  let newBrands = [];

  for (let i = 0; i < numberOfBrands; i++) {
    let name = faker.company.name();
    let slug =
      name.toLowerCase().replace(/ /g, "-") +
      "-" +
      Math.floor(Math.random() * 1000);

    newBrands.push({
      name: name,
      slug: slug,
      createdById: users[0].id,
    });
  }
  try {
    await prisma.brand.createMany({
      data: newBrands,
    });
  } catch (error) {
    console.log(error);
  }

  const brands = await prisma.brand.findMany();
}

async function generateProducts(numberOfProducts, deleteItems) {
  if (deleteItems) {
    try {
      await prisma.product.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
  const users = await prisma.user.findMany();
  const stores = await prisma.store.findMany();
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();
  let newProducts = [];

  for (let i = 0; i < numberOfProducts; i++) {
    let randomPlaceholder = Math.floor(Math.random() * 1000);
    let name = faker.commerce.productName() + " " + randomPlaceholder;
    let slug =
      name.toLowerCase().replace(/ /g, "-") +
      "-" +
      Math.floor(Math.random() * 1000);

    let randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    let randomBrand = brands[Math.floor(Math.random() * brands.length)];
    let randomStore = stores[Math.floor(Math.random() * stores.length)];
    let randomUser = users[Math.floor(Math.random() * users.length)];
    let randomImages = [];
    for (let i = 0; i < 5; i++) {
      randomImages.push(faker.image.business(720, 720, true));
    }
    //convert random images to string
    randomImages = randomImages.toString();
    let randomPrice = parseInt(faker.commerce.price(100, 100000));

    newProducts.push({
      name: name,
      slug: slug,
      description: faker.commerce.productDescription(),
      price: randomPrice,
      discountPrice: randomPrice - Math.floor(Math.random() * 100),
      thumbnail: faker.image.business(400, 400, true),
      images: randomImages,
      stock: parseInt(faker.commerce.price(1, 999)),
      brandId: randomBrand.id,
      storeId: randomStore.id,
      categoryId: randomCategory.id,
      userId: randomUser.id,
    });
  }

  try {
    await prisma.product.createMany({
      data: newProducts,
    });
  } catch (error) {
    console.log(error);
  }

  const products = await prisma.product.findMany();
}

async function getAllData() {
  const users = await prisma.user.findMany({
    take: 5,
  });
  const stores = await prisma.store.findMany({
    take: 5,
  });
  const brands = await prisma.brand.findMany({
    take: 5,
  });
  const categories = await prisma.category.findMany({
    take: 5,
  });
  const products = await prisma.product.findMany({
    take: 5,
  });

  console.log({
    users,
    stores,
    brands,
    categories,
    products,
  });
}

generateCategories(10, true);
generateBrands(10, true);
generateProducts(10, true);
getAllData();
