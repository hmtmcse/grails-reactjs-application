import React from 'react';
import {loginPageJSS} from './../../assets/jss/application-jss';
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
            loginDetails: {password: "", email: ""}
        };
    }

    doLogin = event => {
        event.preventDefault();
        console.log(this.state.email)
        console.log(this.state.password)
        if (this.state.email === "" || this.state.email == null) {
            this.showErrorInfo("Please Enter Email.")
        } else if (this.state.password === "" || this.state.password == null) {
            this.showErrorInfo("Please Enter Password.")
        } else {
            this.postJsonToApi("api/v1/authentication/login", {email: this.state.email, password: this.state.password},
                success => {
                    let response = success.data;
                    if (!response.isSuccess) {
                        this.showErrorInfo(response.message)
                    } else {
                        console.log(response)
                        this.showSuccessInfo(response.response.firstName)
                    }
                }
            )
        }
    };

    handleChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    appRender() {
        const {classes} = this.props;

        const loginUI = (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant="headline">Grails ReactJs Application</Typography>
                        <form onSubmit={this.doLogin} className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" required name="email" autoComplete="email" autoFocus
                                       onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input required name="password" type="password" id="password"
                                       onChange={this.handleChange}/>
                            </FormControl>
                            <Button type="submit" fullWidth variant="raised" color="primary" children="Sign in"
                                    className={classes.submit}/>
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