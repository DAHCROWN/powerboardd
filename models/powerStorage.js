import {Schema, model, models} from "mongoose"

const NetPowerSchema = new Schema({
    id: {
       type: String,
       unique: true,
       required: [true, "Id is required"]
    },
    timestamp:{
      type: [Number]
    },
    netPower:{
      type: [Number]
    }
})

const NetPowerProperties = models.NetPowerProperties || model("NetPowerProperties", NetPowerSchema)

export default NetPowerProperties