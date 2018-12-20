import React from 'react'
import RaViewComponent from "./../../artifacts/ra-view-component";
import {
    TableRow, TableCell, TableHead, TableBody, TableFooter, TablePagination, Paper, MenuItem,
    TableSortLabel, Table, FormControlLabel, Checkbox, FormGroup, FormLabel, RadioGroup,
    IconButton, CardContent, Typography, CardActions, CardHeader, CardMedia, Tooltip, Button, Grid, TextField
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import RaTableHeader from './../../artifacts/ra-table-header';
import RaPagination from './../../artifacts/ra-pagination';
import UserCreateUpdateView from './user-create-update-view';
import LongMenu from "./long-menu";


export const UserOtherUrls = [
    {
        path: "/user/create-update",
        name: "Create Update",
        component: UserCreateUpdateView,
        isActive: true,
    }
];

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


const tableHeader = [
    {id: 'firstName', numeric: false, disablePadding: false, label: 'Name'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
];

class UserMainView extends RaViewComponent {

    constructor(props) {
        super(props);
        this.state = {
            viewName: "main",
            orderBy: "id",
            order: "desc",
            users: [],
        };
    }


    componentDidMount() {
        this.showFlashMessage();
        this.getToApi("api/v1/user/list", response => {
            this.setState({users:response.data.response})
        });
    }

    handleChangePage = (event, page) => {

    };

    handleChangeRowsPerPage = event => {

    };

    clickOnSort = (name, row, event) => {
        const orderBy = name;
        let order = 'desc';
        if (this.state.orderBy === name && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
    };


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
                    <Button className={classes.marginToLeft} onClick={event =>{this.goToUrl("/user/create-update", event)}} variant="contained" color="primary">Create</Button>
                    <Button className={classes.marginToLeft} variant="contained" color="primary">Reload</Button>
                </div>
            </Paper>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <RaTableHeader
                            clickForSort={this.clickOnSort}
                            rows={tableHeader}
                            order={this.state.order}
                            orderBy={this.state.orderBy}/>
                        <TableBody>
                            {this.state.users.map(function (user, key) {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell numeric><LongMenu/></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <RaPagination total={100}/>
            </Paper>
        </React.Fragment>);
    }
}
export default withStyles(styles)(UserMainView);