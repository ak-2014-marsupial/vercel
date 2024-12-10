import {Initialization} from "../models/Initialization.model.js";
import {Role} from "../models/role.model.js";
import {passwordService} from "../services/password.service.js";
import {configs} from "./config.js";
import {User} from "../models/user.model.js";

// const defaultRoles = [
//     {title: 'guest', rate: 100},
//     {title: 'admin', rate: 0},
//     {title: 'manager', rate: 5},
//     {title: 'user', rate: 10}
// ];
const defaultRoles = JSON.parse(configs.DEFAULT_ROLES)

const populateDB = async () => {
    try {
        const initialization = await Initialization.findOne();
        if (initialization && initialization.isPopulated) {
            return
        }

        const roles = await Role.find();
        if (roles.length === 0) {
            const roleDocuments = defaultRoles.map(role => ({title: role.title, rate: role.rate}));
            console.log("populateDb:2 >", {roleDocuments});
            await Role.insertMany(roleDocuments);
        }
        const users = await User.find();
        if (users.length === 0) {
            const roles = await Role.find(); // Fetch roles to assign to the super user
            const superUser = {
                name: configs.SUPER_USER_NAME,
                email: configs.SUPER_USER_EMAIL,
                password: await passwordService.hashPassword(configs.SUPER_USER_PASSWORD),
                isVerified: true,
                provider: "init",
                roles: roles.map(role => role._id), // Assign all roles to the super user
            };
            await User.create(superUser);
        }

        if (!initialization) {

            await Initialization.create({isPopulated: true});
        } else {
            initialization.isPopulated = true;
            await initialization.save();
        }

    } catch (error) {
        console.log(error.message);
    }

}

export {populateDB}