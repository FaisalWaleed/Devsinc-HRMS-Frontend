import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { verifyCredentials } from "./actions/auth/authConfig";

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { verifyCredentials } from "./actions/auth/authConfig";

import "assets/css/material-dashboard-react.css";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

const store = configureStore();

verifyCredentials(store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
