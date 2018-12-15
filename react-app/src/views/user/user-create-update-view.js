import RaViewComponent from "../../artifacts/ra-view-component";
import React from "react";
import {Button, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography} from "@material-ui/core";


export default class UserCreateUpdateView extends RaViewComponent {

    appRender() {
        return (<React.Fragment>
            <Paper className={classes.mainActionArea}>
                <div>
                    <Typography variant="headline">Users</Typography>
                </div>
                <div>
                    <form className={classes.displayInline}>
                        <TextField placeholder="search" name="search"/>
                    </form>
                    <Button className={classes.marginToLeft} variant="contained" color="primary">Create</Button>
                    <Button className={classes.marginToLeft} variant="contained" color="primary">back</Button>
                </div>
            </Paper>
        </React.Fragment>);
    }

}