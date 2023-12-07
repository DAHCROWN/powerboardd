import mongoose from "mongoose"

const { MONGODB_URI} = process.env
if(!MONGODB_URI) {
    throw new Error("invalid environmental Variable")
}

export const connectDB = async () => {
    try {
        const {connection } = await mongoose.connect(MONGODB_URI)
        if(connection.readyState === 1){
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}