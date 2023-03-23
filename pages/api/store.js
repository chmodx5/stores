export default function handler(req, res) {
  const body = req.body;

  console.log("body", body.email);

  res.status(200).json({ data: "John Doe" });
}
