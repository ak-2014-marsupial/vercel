import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {GoogleOAuthProvider} from "@react-oauth/google"

import {store} from "./redux/store.js";
import {appConstants} from "./constants/app.constants.js";
import {AppRouter} from "./routes/index.js";

import './styles/index.css';

const clientId=appConstants.googleClientId;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </GoogleOAuthProvider>
);

