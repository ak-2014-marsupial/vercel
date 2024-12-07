import React from 'react';

import css from "./UserInfo.module.css"
import {useSelector} from "react-redux";

const UserInfoComponent = () => {
    const currentUser = useSelector(state => state.auth.currentUser)
    if (!currentUser) return <div>NULL</div>

    const {name, role,roles} = currentUser;
    console.log(roles[0]?.title);

    return (
        <div className={css.UserInfo}>
            <div>{name}</div>
            <div>{roles[0]?.title}</div>
        </div>
    );
};

export {UserInfoComponent};