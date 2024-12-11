import {useDispatch, useSelector} from "react-redux";

import {authActions} from "../features/auth/auth.slice.js";
import {appHelperActions} from "../redux/slices/app.slice.js";
import {FontSizeChangerComponent} from "../components/FontSizeChanger/FontSizeChanger.component.jsx";
import {CheckBoxComponent} from "../components/CheckBox/CheckBox.component.jsx";
import {BsFillGearFill} from "react-icons/bs";
import {GrLanguage} from "react-icons/gr";
import {appConstants} from "../constants/app.constants.js";
import {DropdownComponent2} from "../components/DropDown_2/Dropdown.component_2.jsx";

const useCheckedState = (slice, key) => {
    return Boolean(useSelector(state => state[slice][key]));
};

const useValueByKey = (slice, key) => {
    return useSelector(state => state[slice][key]);
}

const useIconsConfig = () => {
    const dispatch = useDispatch();

    const iconsMenuConfig = [
        {
            component: GrLanguage, props: {className: "icon"}, isOpenAfterClick: true, noArrow: true, children: [
                {title: 'En'},
                {title: 'Uk'},
            ],
        },

        {
            component: BsFillGearFill, props: {className: "icon"}, isOpenAfterClick: true, noArrow: true, children: [
                {
                    title: "Save in LocalStorage",
                    component: CheckBoxComponent,
                    props: {
                        checked: useCheckedState("auth", "isSessionSave"),
                        onChange: () => dispatch(authActions.setIsSessionSave())
                    },
                },
                {
                    title: "Toggle dropdown on hover",
                    component: CheckBoxComponent,
                    props: {
                        checked: useCheckedState("app", "isDropdownOnHover"),
                        onChange: () => dispatch(appHelperActions.toggleDropdownOnHover())
                    },
                },
                {
                    component: FontSizeChangerComponent,
                },
                {
                    title: "theme",
                    component: DropdownComponent2,
                    props: {
                        items: appConstants.availableThemes,
                        title: useValueByKey("app", "theme"),
                        cb: (theme) => dispatch(appHelperActions.setTheme(theme))
                    }
                }
            ],
        },

    ];

    return iconsMenuConfig
}
export default useIconsConfig;

