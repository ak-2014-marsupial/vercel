import {UsersPage} from "../Pages/UsersPage.jsx";
import {DashboardPage} from "../Pages/DashboardPage.jsx";
import {ProfilePage} from "../Pages/ProfilePage.jsx";
import {InventoryPage} from "../Pages/InventoryPage.jsx";

const u1 = () => (<h1>U1</h1>)
const u2 = () => (<h1>U2</h1>)

export const privateRoutes = [
    {
        component: UsersPage, title: "Users", path: "/users", permission: ["admin", "manager"], children: [
            {component: u1, title: "U1", path: "u1"},
            {component: u2, title: "U2", path: "u2"},
        ]
    },
    {component: DashboardPage, title: "Dashboard", path: "/dashboard", permission: ["admin"]},
    {component: InventoryPage, title: "Inventory", path: "/inventory", permission: ["admin"]},
    {component: ProfilePage, title: "Profile", path: "/profile", permission: ["admin", "manager"]},
];