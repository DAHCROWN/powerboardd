import { upload_data, fetchDB } from "@/helpers/db";

export default function handler(req, res) {
  console.log("req", req);
  const data = fetchDB();
  res.status(200).json(data);
  res.status(200).json({ message: `Hello from Powerboard!${data}` });

  res.status(200).json({ message: "Hello from Next.js!" });
}
