import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import {
    CssBaseline, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { mainLayoutJSS } from './../assets/jss/application-jss';
import NavigationElement from './../components/elements/navigation-element';
import {LayoutsRoutes} from './../config/router';
import {PageRoutes} from "../config/router";
import {authenticationService} from "../services/authentication-service";


class MainLayout extends Component {

    urlChecker(checkingURL){
        let url = this.props.location.pathname;
        if (url === checkingURL){
            return true;
        }
        let isMain = true;
        LayoutsRoutes.map((route, i) => {
            if (route.path === url){
                isMain = false;
            }
        });
        return isMain;
    }

    isMainLayout(){
        return this.urlChecker("/");
    }

    isLoginLayout(){
        return this.urlChecker("/login");
    }

    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                {this.isMainLayout() ? (<div className={classes.root}>
                    <NavigationElement/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        {PageRoutes.map((route, key) =>{
                            return <Route path={route.path} component={route.component} key={key} />;
                        })}
                    </main>
                </div>) : (<Redirect to="/login"/>)};
            </React.Fragment>
        );
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(mainLayoutJSS)(MainLayout);