import {useDispatch, useSelector} from "react-redux";

import {textConstants} from "../constants/text.constant.js";
import {authActions} from "../features/auth/auth.slice.js";
import {CheckBoxComponent} from "../components/CheckBox/CheckBox.component.jsx";

const useCheckedState = () => {
    const result =Boolean(useSelector(state => state.auth.isSessionSave))
    return result;
};

const useItemsConfig = () => {
    const dispatch = useDispatch();
    const isChecked = useCheckedState()

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
            title: textConstants.settings, children: [
                {
                    title: "Save in LocalStorage",
                    component: CheckBoxComponent,
                    props: {
                        checked: isChecked,
                        onChange: () => dispatch(authActions.setIsSessionSave())
                    },
                    // cb: (mess) => dispatch(authActions.setIsSessionSave())
                },
                {
                    title: 'Themes', children: [
                        {title: "Dark"},
                        {title: "Light"},
                    ]
                },
                {title: 'Our values', path: "values"},
            ],
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

