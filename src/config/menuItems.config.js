import {useDispatch} from "react-redux";

import {textConstants} from "../constants/text.constant.js";
import {authActions} from "../features/auth/auth.slice.js";



const useItemsConfig = () => {
    const dispatch = useDispatch();

    const menuItemsConfig = [
        {title: textConstants.inventory, path: '/inventory', permission: ["admin", "manager"]},
        {title: textConstants.home, path: '/home'},
        {
            title: 'Services', children: [
                {title: textConstants.users, path: "/users", permission: ["admin", "manager", "user"]},
                {title: 'web design', cb: (mess) => console.log(mess), permission: ["admin", "manager", "user"]},
                {
                    title: 'web development', children: [
                        {title: 'Frontend', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
                        {
                            title: 'Backend', permission: ["admin", "manager", "user"], children: [
                                {title: 'NodeJS', cb: (mess) => console.log(mess), permission: ["admin", "manager"]},
                                {
                                    title: 'PHP',
                                    cb: (mess) => console.log(mess),
                                },
                            ],
                        },
                    ],
                },
                {title: 'SEO', cb: (mess) => console.log(mess), permission: ["user"]},
            ],
        },
        {
            title: "Auth", children: [
                {title: textConstants.login, path: "/login"},
                {title: textConstants.register, path: "/register"},
                {title: "Log OUT", cb: (mess) => dispatch(authActions.logOut(mess))},
                {title: "Get ME", cb: (mess) => dispatch(authActions.me())},
            ]
        },
        {
            title: textConstants.about, path: '/about', children: [
                {title: 'Who we are', path: "who"},
                {title: 'Our values', path: "values"},
            ],
        },
    ];

    return menuItemsConfig
}
export default useItemsConfig;

