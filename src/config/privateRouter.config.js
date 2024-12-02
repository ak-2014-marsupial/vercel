import {UsersPage} from "../Pages/UsersPage";
import {DashboardPage} from "../Pages/DashboardPage";
import {ProfilePage} from "../Pages/ProfilePage";

export const privateRoutes = [
    {component: UsersPage, title: "Users", path: "/users", permission: ["admin","manager"]},
    {component: DashboardPage, title: "Dashboard", path: "/dashboard", permission: ["admin"]},
    {component: ProfilePage, title: "Profile", path: "/profile", permission: ["admin","manager"]},
];