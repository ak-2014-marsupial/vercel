import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {router} from "./router";
import {GoogleOAuthProvider} from "@react-oauth/google"
import {appConstants} from "./constants/appConstants";

const clientId=appConstants.googleClientId;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </GoogleOAuthProvider>
);

