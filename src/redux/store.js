import {configureStore} from "@reduxjs/toolkit";
import {appHelperReducer} from "./slices/app.slice";
import {loadingReducer} from "./slices/loading.slice";
import {authReducer} from "./slices/auth.slice";

const store = configureStore({
    reducer: {
        // data:dataSourceReducer,
        loadingReducer,
        auth:authReducer,
        app:appHelperReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export {store}