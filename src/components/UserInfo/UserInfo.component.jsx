import React from 'react';

import css from "./UserInfo.module.css"
import {useSelector} from "react-redux";

const UserInfoComponent = () => {
    const currentUser = useSelector(state => state.auth.currentUser)
    if (!currentUser) return <div>NULL</div>

    const {name, role} = currentUser;

    return (
        <div className={css.UserInfo}>
            <div>{name}</div>
            <div>{role[0]}</div>
        </div>
    );
};

export {UserInfoComponent};