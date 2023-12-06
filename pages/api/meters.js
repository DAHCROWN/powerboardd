import db_query from "@/helpers/db";
import { upload_data } from "@/helpers/db";
export default function handler(req, res) {
  console.log("req", req);
  if (req.method == "GET") {
    const { id } = req.query;
    const data = db_query(id);
    res.status(200).json({ message: data });
    res.status(200).json({ message: `Hello from Powerboard! AGAIN ${id}` });


  } else if (req.method == "POST") {
    const { id, gen_current, gen_voltage, con_current, con_voltage} = req.query;

    const postdata = {
      id: id, 
      gen_current: gen_current,
      gen_voltage: gen_voltage,
      con_current: con_current,
      con_voltage: con_voltage
    }
    upload_data(postdata)
    res.status(200).json({ message: `POSTED ${postdata}` });
  }

  res.status(200).json({ message: "Hello from Next.js!" });
}
