import LoginLayout from './../views/layouts/login-layout';
import MainLayout from './../views/layouts/main-layout';
import DashboardView from './../views/dashboard-view';
import NotFoundView from './../views/not-found-view';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


const Layouts = [
    {
        path: "/login",
        component: LoginLayout,
        isActive: true,
    },
    {
        path: "/",
        component: MainLayout,
        isActive: true,
    }
];


const ViewsUrlsMapping = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        component: DashboardView,
        isLeftNav: true,
        isActive: true,
    }
];


const RouteWithSubRoutes = route => {
    if (route.isActive) {
        return (
            <Route
                exact={route.isExact}
                path={route.path}
                render={props => (
                    <route.component {...props} routes={route.routes}/>
                )}
            />
        )
    }
};

const LayoutUrlsMapping = () => (
    <Router>
        <React.Fragment>
            <Switch>
                {Layouts.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                <Route component={NotFoundView}/>
            </Switch>
        </React.Fragment>
    </Router>
);


export {
    LayoutUrlsMapping,
    ViewsUrlsMapping,
    Layouts
};