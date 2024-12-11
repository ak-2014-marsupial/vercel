import React from 'react';

import css from "./UserInfo.module.css"
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../features/auth/auth.slice";
import {DropdownComponent2} from "../DropDown_2/Dropdown.component_2.jsx";

const UserInfoComponent = () => {
    const {currentUser, currentRole} = useSelector(state => state.auth);
    const dispatch=useDispatch()
    if (!currentUser) return <div>NULL</div>

    const {name, roles:rolesObj} = currentUser;
    const roles=rolesObj.map(item=>item.title)

    return (
        <div className={css.UserInfo}>
            <div>{name}</div>
            <DropdownComponent2 items={roles} title={currentRole} cb={(item) => dispatch(authActions.setCurrentRole(item))}/>
        </div>
    );
};

export {UserInfoComponent};