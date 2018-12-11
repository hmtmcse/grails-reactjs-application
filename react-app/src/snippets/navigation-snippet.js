import React from 'react'
import {
    AppBar, Badge, Divider, Drawer, IconButton,
    Icon, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar, Typography, withStyles
} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import {PageRoutes} from './../../config/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MenuIcon from "../../../node_modules/@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {authenticationService} from "../../services/authentication-service";
import AppComponent from "../system/app-component";
import {navigationSnippetJSS} from "../assets/jss/navigation-snippet-jss";


class NavigationSnippet extends AppComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };


    logout = event =>{
        event.preventDefault();
        this.getToApi("api/v1/authentication/logout", response => {
            authenticationService.logout();
            window.location = "/login"
        });
    };


    appRender(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton,this.state.open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap className={classes.title}>
                            HMTMCSE
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <ExitToApp onClick={this.logout}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}>
                    <div className={classes.toolbarIcon}>
                        <Typography variant="title" color="primary" align="center" noWrap>
                            Navigation
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuList>
                        {PageRoutes.map((route, i) => {
                            return(
                                <NavLink to={route.path} className={classes.removeDecoration} key={i}>
                                    <MenuItem button>
                                        <ListItemIcon>
                                            {typeof route.icon === "string" ? (
                                                <Icon>{route.icon}</Icon>
                                            ) : (
                                                <route.icon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={route.name} />
                                    </MenuItem>
                                </NavLink>
                            )
                        })}
                    </MenuList>
                </Drawer>
            </React.Fragment>
        );
    }
}

NavigationSnippet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(navigationSnippetJSS)(NavigationSnippet);