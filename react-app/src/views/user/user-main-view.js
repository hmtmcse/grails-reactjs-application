import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    TableRow, TableCell, TableHead, TableBody, TableFooter, TablePagination, Menu, MenuItem,
    TableSortLabel, Table, FormControlLabel, Checkbox, FormGroup, FormLabel, RadioGroup,
    IconButton, CardContent, Typography, CardActions, CardHeader, CardMedia, Tooltip, Button, Grid, TextField
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


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

class UserMainView extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }


    componentDidMount() {
        this.getToApi("api/v1/user/list", response => {
            this.setState({users:response.data.response})
        });
    }

    handleChangePage = (event, page) => {

    };

    handleChangeRowsPerPage = event => {

    };

    appRender () {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.mainActionArea}>
                    <div>
                        <Typography variant="headline">Users</Typography>
                    </div>
                    <div>
                        <form className={classes.displayInline}>
                            <TextField placeholder="search" name="search"/>
                        </form>
                        <Button className={classes.marginToLeft} variant="contained" color="primary" >Create</Button>
                        <Button className={classes.marginToLeft} variant="contained" color="primary" >Reload</Button>
                    </div>
                </Paper>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map(function(user, key) {
                                        return (
                                            <TableRow >
                                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                            </Table>

                    </div>
                    <TablePagination
                        component="div"
                        count={10}
                        rowsPerPage={3}
                        page={0}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(UserMainView);