import React, { Component } from 'react';
import { loginPageJSS } from './../../assets/jss/application-jss';
import {
    CssBaseline, Paper, Avatar, Typography, FormControl, InputLabel, Input, Button,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/LockOutlined';
import AppComponent from "../system/app-component";


class LoginPage extends AppComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    doLogin = event => {
        event.preventDefault();
    };

    handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target;
    };

    appRender () {
        const { classes } = this.props;

        const loginUI = (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Grails ReactJs Application</Typography>
                        <form onSubmit={this.doLogin} className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" required name="email" autoComplete="email" autoFocus  onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth error>
                                <InputLabel htmlFor="password" >Password</InputLabel>
                                <Input required  name="password" type="password" id="password" onChange={this.handleChange}/>
                            </FormControl>
                            <Button type="submit" fullWidth variant="raised" color="primary" children="Sign in" className={classes.submit}/>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
        return loginUI;
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(loginPageJSS)(LoginPage);