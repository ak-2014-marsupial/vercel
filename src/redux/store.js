import {configureStore} from "@reduxjs/toolkit";

import {appConstants} from "../constants/app.constants.js";
import {authReducer} from "../features/auth/auth.slice.js";
import {loadingReducer} from "./slices/loading.slice.js";
import {appHelperReducer} from "./slices/app.slice.js";

const store = configureStore({
    reducer: {
        loadingReducer,
        auth: authReducer,
        app: appHelperReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


store.subscribe(() => {
    const isSessionSave = store.getState().auth.isSessionSave;

    localStorage.setItem(appConstants.localStorageKeyIsSessionSave, store.getState().auth.isSessionSave);
    localStorage.setItem(appConstants.localStorageKeyTheme, store.getState().app.theme);
    localStorage.setItem(appConstants.localStorageKeyIsDropdownOnHover, store.getState().app.isDropdownOnHover);

    if (isSessionSave) {
        localStorage.setItem(appConstants.localStorageKeyCurrentUser, JSON.stringify(store.getState().auth.currentUser));
    } else{
        localStorage.removeItem(appConstants.localStorageKeyCurrentUser)
    }
});


export {store}