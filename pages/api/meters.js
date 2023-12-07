import db_query from "@/helpers/db";
import { upload_data } from "@/helpers/db";
import { connectDB } from "@/lib/mongodb";
import UsageProperties from "@/models/powerUsage";
import { revalidatePath } from 'next/cache'

export default async function handler(req, res) {
  connectDB().catch((err) => res.json(err));
  if (req.method == "GET") {
    const { id } = req.query;
    const meterUsage = await UsageProperties.findOne({ id: id})
    if (!meterUsage){
      const data = db_query(id);
      res.status(200).json({ message: data });

    }
    // const data = db_query(id);
    res.status(200).json({ message: meterUsage });
    // res.status(200).json({ message: `Hello from Powerboard! AGAIN ${id}` });
    



  } else if (req.method == "POST") {
    const { id, gen_current, gen_voltage, con_current, con_voltage } = req.query;
    const meterUsage = await UsageProperties.findOne({ id: id})
    if(meterUsage){
      meterUsage.gen_current = gen_current
      meterUsage.gen_voltage = gen_voltage
      meterUsage.con_current = con_current
      meterUsage.con_voltage = con_voltage
      await meterUsage.save();
      // revalidatePath(`/meters}`)
      return res.status(200).json({success: true, usage: meterUsage})
    }else{
      UsageProperties.create({
        id,
        gen_current, gen_voltage, con_current, con_voltage
      })
      // revalidatePath(`/meters`)
      // await meterUsage.save();
      return res.status(201).json(({success: true, user: meterUsage}))
    }

  }

  res.status(200).json({ message: "Hello from Next.js!" });
}
