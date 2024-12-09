import mongoose, {Schema} from "mongoose";

const initializationSchema = new Schema({
    isPopulated: {type: Boolean, default: false}
})

export const Initialization = mongoose.model("initialization", initializationSchema)