import {createSlice} from "@reduxjs/toolkit";

import {appConstants} from "../../constants/app.constants.js";


const {localStorageKeyFontSize} = appConstants;

let fontSize = Number(localStorage.getItem(localStorageKeyFontSize)) || 16;
fontSize = fontSize < 10 ? 16 : fontSize;

const initialState = {
    fontSize: fontSize,
    theme: localStorage.getItem(appConstants.localStorageKeyTheme) || "light",
    isDropdownOnHover: Boolean(+localStorage.getItem(appConstants.localStorageKeyIsDropdownOnHover)) || 0,
}

export const appHelperSlice = createSlice({
    name: "appHelper",
    initialState,
    reducers: {
        setFontSize: (state, action) => {
            const fontSize = Number(action.payload);
            state.fontSize = fontSize;
            localStorage.setItem(localStorageKeyFontSize, fontSize.toString())
        },
        toggleDropdownOnHover: (state) => {
            state.isDropdownOnHover ^= true;
        },
        setTheme: (state, action) => {
            console.log(action.payload);
            state.theme = action.payload;
        }
    }
})

const {reducer: appHelperReducer, actions} = appHelperSlice;

const appHelperActions = {
    ...actions
}

export {appHelperActions, appHelperReducer}