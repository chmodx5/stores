import prisma from "./../../utils/prismadb.js";

export default async function handler(req, res) {
  //check if http method is GET
  if (req.method == "GET") {
    const { q } = req.query;
    let products = [];

    if (q === "") {
      return res.status(200).json({
        items: [],
      });
    }
    //check if query string length is greater than 2
    if (q.length > 2) {
      const productsByName = await prisma.product.findMany({
        // where: {
        //   name: {
        //     contains: q,
        //   },
        // },
        where: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          slug: true,
        },
      });
      console.log("query", q);

      return res.status(200).json({
        items: productsByName,
      });
    }
    return res.status(200).json({
      items: [],
    });
  }

  return res.status(404).json({
    message: "sasa unafanya nini hapa",
  });
}
