import RaViewComponent from "../../artifacts/ra-view-component";
import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import RaTableHeader from "../../artifacts/ra-table-header";
import RaPagination from "../../artifacts/ra-pagination";


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

    appRender() {
        const {classes} = this.props;
        return (<React.Fragment>
            <Paper className={classes.mainActionArea}>
                <div>
                    <Typography variant="headline">Users</Typography>
                </div>
                <div>
                    <form className={classes.displayInline}>
                        <TextField placeholder="search" name="search"/>
                    </form>
                    <Button className={classes.marginToLeft} onClick={event =>{this.goToUrl("/user", event)}} variant="contained" color="primary">Cancel</Button>
                    <Button className={classes.marginToLeft} variant="contained" color="primary">Reload</Button>
                </div>
            </Paper>
        </React.Fragment>);
    }
}

export default withStyles(styles)(UserCreateUpdateView);