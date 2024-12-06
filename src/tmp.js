// const roles = ["user"];
//
// const menuItemsConfig = [
//     {title: "inventory", path: '/inventory', permission: ["admin", "manager"]},
//     {title: "home", path: '/home'},
//     {
//         title: 'Services', children: [
//             {title: "users", path: "/users", permission: ["admin", "manager", "user"]},
//             {title: 'web design', cb: (mess) => console.log(mess), permission: ["admin", "manager", "user"]},
//             {
//                 title: 'web development', children: [
//                     {title: 'Frontend', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
//                     {
//                         title: 'Backend', children: [
//                             {title: 'NodeJS', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
//                             {
//                                 title: 'PHP',
//                                 cb: (mess) => console.log(mess),
//                                 permission: ["admin", "manager", "user"]
//                             },
//                         ],
//                     },
//                 ],
//             },
//             {title: 'SEO', cb: (mess) => console.log(mess), permission: ["user"]},
//         ],
//     },
//     {
//         title: "Auth", children: [
//             {title: "login", path: "/login"},
//             {title: "register", path: "/register"},
//             {title: "Log OUT", cb: (mess) => console.log(mess)},
//             {title: "Get ME", cb: (mess) => console.log(mess)},
//         ]
//     },
//     {
//         title: "settings", children: [
//             {
//                 title: "Save in LocalStorage",
//                 cb: (mess) => console.log(mess)
//             },
//             {
//                 title: 'Themes', children: [
//                     {title: "Dark"},
//                     {title: "Light"},
//                 ]
//             },
//             {title: 'Our values', path: "values"},
//         ],
//     },
//     {
//         title: "about", path: '/about', children: [
//             {title: 'Who we are', path: "who"},
//             {title: 'Our values', path: "values"},
//         ],
//     },
// ];
//
// function filterMenuItems(menuItems, roles) {
//     return menuItems.reduce((acc, item) => {
//         const hasPermission = item.permission ? item.permission.some(role => roles.includes(role)) : true;
//
//         if (hasPermission) {
//             const newItem = { ...item };
//             if (item.children) {
//                 newItem.children = filterMenuItems(item.children, roles);
//                 if (newItem.children.length === 0) {
//                     delete newItem.children; // Удаляем пустые children
//                 }
//             }
//             acc.push(newItem);
//         }
//         return acc;
//     }, []);
// }
//
// const filteredMenu = filterMenuItems(menuItemsConfig, roles);
// console.log(JSON.stringify(filteredMenu,null,1));
