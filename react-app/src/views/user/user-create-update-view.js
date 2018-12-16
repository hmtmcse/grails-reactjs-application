import RaViewComponent from "../../artifacts/ra-view-component";
import React from "react";
import {
    Button, TextField, FormControl, InputLabel, Radio,
    Select,MenuItem, FormControlLabel, Checkbox, FormGroup, FormLabel,RadioGroup,
    Card, CardContent, CardActions, CardHeader, Grid, withStyles
} from '@material-ui/core'


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
        };
    }


    formSubmitHandler = event => {
        event.preventDefault();
        const {name, value} = event.target;
        console.log(this.state.formData)
    };


    appRender() {
        const registrationForm = (
            <form onSubmit={this.formSubmitHandler}>
                <Card>
                    <CardHeader title="Create User"/>
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={6}><TextField label="First name" name="firstName" value={this.state.firstName} onChange={this.handleFormChange} error={false} helperText="" fullWidth/></Grid>
                            <Grid item xs={6}><TextField label="Last name" name="lastName" value={this.state.lastName} onChange={this.handleFormChange} fullWidth/></Grid>
                            <Grid item xs={6}><TextField label="Email" type="email" name="email" value={this.state.email} onChange={this.handleFormChange} fullWidth/></Grid>
                            {!this.state.edit? <Grid item xs={6}><TextField label="Password" type="password" name="password" onChange={this.handleFormChange} fullWidth/></Grid> : ''}
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