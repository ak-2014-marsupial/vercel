import {configureStore} from "@reduxjs/toolkit";
import {appHelperReducer} from "./slices/app.slice";
import {loadingReducer} from "./slices/loading.slice";
import {authReducer} from "../features/auth/auth.slice";
import {appConstants} from "../constants/app.constants";

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

    const key = appConstants.localStorageKeyIsSessionSave;
    localStorage.setItem(key, JSON.stringify(store.getState().auth.isSessionSave));

    if (isSessionSave) {
        localStorage.setItem(appConstants.localStorageKeyCurrentUser, JSON.stringify(store.getState().auth.currentUser));
    } else{
        localStorage.removeItem(appConstants.localStorageKeyCurrentUser)
    }
});


export {store}