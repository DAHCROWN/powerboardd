import {Schema, model, models} from "mongoose"

const UsageSchema = new Schema({
    id: {
       type: String,
       unique: true,
       required: [true, "Id is required"]
    },
    gen_current: {
        type: Number,
        unique: false
      },
    gen_voltage: {
        type: Number,
        unique: false
      },
    con_current: {
       type: Number,
       unique: false
     },
     con_voltage: {
        type: Number,
        unique: false
      },
})

const UsageProperties = models.UsageProperties || model("UsageProperties", UsageSchema)

export default UsageProperties