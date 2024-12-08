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
    const isSaveInLS = store.getState().auth.isAdditionallyStoredInLocalStorage;

    console.log({isSaveInLS})
    const key = appConstants.localStorageKeyIsSessionSave;
    localStorage.setItem(key, JSON.stringify(store.getState().auth.isAdditionallyStoredInLocalStorage));

    if (isSaveInLS) {
        localStorage.setItem(appConstants.localStorageKeyCurrentUser, JSON.stringify(store.getState().auth.currentUser));
    } else{
        localStorage.removeItem(appConstants.localStorageKeyCurrentUser)
    }
});


export {store}