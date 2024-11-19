import {createSlice} from "@reduxjs/toolkit";
import {appConstants} from "../../constants/appConstants";


const {localStorageKeyFontSize} = appConstants;

let fontSize = Number(localStorage.getItem(localStorageKeyFontSize)) || 16;
fontSize = fontSize < 10 ? 16 : fontSize;

const initialState = {
    fontSize: fontSize,
    currentUser: {},
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
        setCurrentUser: (state, action) => {
            const currentUser = action.payload;
            state.currentUser = currentUser;
        },

    }
})

const {reducer: appHelperReducer, actions} = appHelperSlice;

const appHelperActions = {
    ...actions
}

export {appHelperActions, appHelperReducer}