import mongoose from "mongoose";

const {Schema} = mongoose;

const roleSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        rate: {type: Number, require: true}
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

// Middleware to create default roles
roleSchema.statics.createDefaultRoles = async function () {
    const roles = [
        {title: "guest", rate: 100},
        {title: "admin", rate: 0},
        {title: "manager", rate: 5},
        {title: "user", rate: 10}
    ];
    await this.insertMany(roles);

};

export const Role = mongoose.model("Role", roleSchema);