import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {AppRouter} from "./routes";
import {GoogleOAuthProvider} from "@react-oauth/google"
import {appConstants} from "./constants/app.constants";

const clientId=appConstants.googleClientId;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </GoogleOAuthProvider>
);

