import {Initialization} from "../models/Initialization.model";
import {Role} from "../models/role.model";
import {User} from "../models/user.model";
import {passwordService} from "../services/password.service";

const defaultRoles = [
    {title: 'guest', rate: 100},
    {title: 'admin', rate: 0},
    {title: 'manager', rate: 5},
    {title: 'user', rate: 10}
];

const populateDB = async () => {
    try {
        const initialization = await Initialization.findOne();
        if (initialization && initialization.populated) {
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
                name: 'superuser',
                email: "andrew_100@gmail.com",
                password:await passwordService.hashPassword("A123456789$"),
                isVerified: true,
                provider: "init",
                roles: roles.map(role => role._id), // Assign all roles to the super user
            };
            await User.create(superUser);
        }

        if (!initialization) {

            await Initialization.create({populated: true});
        } else {
            initialization.populated = true;
            await initialization.save();
        }

    } catch (error) {
        console.log(error.message);
    }

}

export {populateDB}