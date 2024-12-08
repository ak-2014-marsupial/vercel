import mongoose from "mongoose";
import {Schema} from "mongoose";
import {Role} from "./role.model";

const providers = ["email/password", "google", "init"];


const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phone: {type: String,},
        password: {type: String},
        googleId: {type: String},
        given_name: {type: String},
        family_name: {type: String},

        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        }],


        provider: {
            type: String,
            enum: providers,
            default: providers[0],
            required: true,
        },
        isVerified: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Pre-save hook to set default role
userSchema.pre('save', async function (next) {
    if (this.isNew && this.roles.length === 0) {
        const defaultRole = await Role.findOne().sort({_id: 1}); // Get the first role
        if (defaultRole) {
            this.roles.push(defaultRole._id); // Add the default role to the roles array
        }
    }
    next();
});

userSchema.statics.findWithRoles = async function (params) {
    return await this.find(params).populate('roles');
};

export const User = mongoose.model("users", userSchema);