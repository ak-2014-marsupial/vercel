import {configureStore} from "@reduxjs/toolkit";
import {appHelperReducer} from "./slices/app.slice";

const store = configureStore({
    reducer: {
        // data:dataSourceReducer,
        app:appHelperReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export {store}