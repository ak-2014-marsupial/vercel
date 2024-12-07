import mongoose, {Schema} from "mongoose";

const initializationSchema = new Schema({
    populated: {type: Boolean, default: false}
})

export const Initialization = mongoose.model("initialization", initializationSchema)