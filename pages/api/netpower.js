import { connectDB } from "@/lib/mongodb";
import NetPowerProperties from "@/models/powerStorage";

export default async function handler(req, res) {
  try {
    const testObject = {
      id: 'test',
      netPower: [],
    };

    await connectDB();

    if (req.method === 'GET') {
      const { id } = req.query;
      const user = await NetPowerProperties.findOne({ id: id });

      if (user) {
        return res.status(200).json({ success: true, user });
      } else {
        return res.status(200).json({ success: true, testObject });
      }
    } else if (req.method === 'POST') {
      const { id, props, timestamp } = req.body;
      // console.log("api,", id)
      // console.log("api", props)
      // console.log("api", timestamp)
      
      const userExists = await NetPowerProperties.findOne({ id: id });
      if (userExists) {
        userExists.netPower.push(...props);
        userExists.timestamp.push(...timestamp)
        await userExists.save();
        return res.status(200).json({ success: true, user: userExists });
      } else {
        const createdUser = await NetPowerProperties.create({id});
        userExists.timestamp.push(...timestamp)
        await createdUser.save();
        return res.status(201).json({ success: true, user: createdUser });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
