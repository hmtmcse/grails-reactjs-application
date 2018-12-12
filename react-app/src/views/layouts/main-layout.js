import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {
    CssBaseline, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import NavigationSnippet from './../../snippets/navigation-snippet';
import RaViewComponent from "../../artifacts/ra-view-component";
import {ViewsUrlsMapping, Layouts} from "../../app/app-url-mapping";
import {AuthenticationService} from "../../services/authentication-service";
import {RaUrlUtil} from "../../artifacts/ra-url-util";
import {AppConstant} from "../../app/app-constant";
import {mainLayoutJSS} from "../../assets/jss/style-jss";
import NotFoundView from "../not-found-view";


class MainLayout extends RaViewComponent {

    isMainLayout(){
        let url = this.props.location.pathname;
        if (RaUrlUtil.isMatchPathname(AppConstant.rootUrl)){
            return true;
        }
        let isMain = true;
        Layouts.map((route, i) => {
            if (route.path === url){
                isMain = false;
            }
        });
        return isMain;
    }

    appRender () {
        const { classes } = this.props;
        let mainPanel = (<div className={classes.root}>
            <NavigationSnippet/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
            <Switch>
                {ViewsUrlsMapping.map((route, key) =>{
                    if (route.isActive){
                        return <Route path={route.path} component={route.component} key={key} />;
                    }
                })}
                <Route component={NotFoundView}/>
            </Switch>
            </main>
        </div>);

        let renderView = (<React.Fragment/>);
        if (!AuthenticationService.isAuthenticated()){
            if(!RaUrlUtil.isMatchPathname(AppConstant.loginUrl)){
                renderView = (<Redirect to={AppConstant.loginUrl}/>);
            }
        }else if (this.isMainLayout()) {
            renderView = mainPanel;
        }

        return (
            <React.Fragment>
                <CssBaseline/>
                {renderView}
            </React.Fragment>
        );
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(mainLayoutJSS)(MainLayout);