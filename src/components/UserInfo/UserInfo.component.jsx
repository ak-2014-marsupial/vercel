import React from 'react';

import css from "./UserInfo.module.css"
import {useDispatch, useSelector} from "react-redux";
import {DropDownComponent} from "../DropDown/DropDown.component";
import {authActions} from "../../features/auth/auth.slice";

const UserInfoComponent = () => {
    const {currentUser, currentRole} = useSelector(state => state.auth);
    const dispatch=useDispatch()
    if (!currentUser) return <div>NULL</div>

    const {name, roles} = currentUser;

    return (
        <div className={css.UserInfo}>
            <div>{name}</div>
            <DropDownComponent items={roles} title={currentRole} cb={(item) => dispatch(authActions.setCurrentRole(item))}/>
        </div>
    );
};

export {UserInfoComponent};