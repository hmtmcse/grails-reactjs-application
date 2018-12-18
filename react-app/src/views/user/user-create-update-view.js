import RaViewComponent from "../../artifacts/ra-view-component";
import React from "react";
import {
    Button, TextField, FormControl, InputLabel, Radio,
    Select,MenuItem, FormControlLabel, Checkbox, FormGroup, FormLabel,RadioGroup,
    Card, CardContent, CardActions, CardHeader, Grid, withStyles
} from '@material-ui/core'
import {ApiURL} from "../../app/api-url";
import {AuthenticationService} from "../../services/authentication-service";
import {RaUrlUtil} from "../../artifacts/ra-url-util";
import {AppConstant} from "../../app/app-constant";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    mainActionArea : {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
    },
    marginToLeft : {
        marginLeft: theme.spacing.unit,
    },
    displayInline : {
        display: "inline",
    },
});


class UserCreateUpdateView extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            formData: {},
            formError: {},
        };
    }


    formSubmitHandler = event => {
        event.preventDefault();
        let formData = this.state.formData;
        this.postJsonToApi(ApiURL.UserCreate, formData,
            success => {
            this.processFormResponse(success.data);
                let response = success.data;
                console.log(response)
            }
        )
    };



    appRender() {
        const registrationForm = (
            <form onSubmit={this.formSubmitHandler}>
                <Card>
                    <CardHeader title="Create User"/>
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={6}><TextField label="First name" name="firstName" error={this.isInputError("firstName")} helperText={this.isInputError("firstName")} value={this.isInputValue("firstName")} onChange={this.handleFormChange} fullWidth/></Grid>
                            <Grid item xs={6}><TextField label="Last name" name="lastName" error={this.isInputError("lastName")} helperText={this.isInputError("lastName")} value={this.isInputValue("lastName")} onChange={this.handleFormChange} fullWidth/></Grid>
                            <Grid item xs={6}><TextField label="Email" type="email" name="email" error={this.isInputError("email")} helperText={this.isInputError("email")} value={this.state.formData.email} onChange={this.handleFormChange} fullWidth/></Grid>
                            {!this.state.edit? <Grid item xs={6}><TextField label="Password" type="password" name="password" error={this.isInputError("password")} helperText={this.isInputError("password")} onChange={this.handleFormChange} fullWidth/></Grid> : ''}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={8} justify="flex-end">
                            <Grid item xs={1}><Button color="primary" type="submit" fullWidth variant="raised" children={this.state.edit ? "Update" : "Save"}/></Grid>
                            <Grid item xs={1}><Button color="primary" onClick={event =>{this.goToUrl("/user", event)}} fullWidth variant="raised" children="Cancel"/></Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </form>
        );
        return registrationForm;
    }
}

export default withStyles(styles)(UserCreateUpdateView);