import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import {
    Fade,Paper, CircularProgress, LinearProgress, InputLabel, Input,
    Radio, Table, TableRow, TableCell, TableHead, TableBody,TableFooter, TablePagination,
    Select,MenuItem, FormControlLabel, Checkbox, FormGroup, FormLabel,RadioGroup,
    Card, CardContent, Typography, CardActions, CardHeader, CardMedia, Grid
} from '@material-ui/core';
import axios from 'axios';
import AppComponent from "../system/app-component";

const styles = theme => ({
    root: {
        color:'blue'
    },
    progress: {
        justifyContent: 'center',
        margin: theme.spacing.unit * 2,
    },
});

class TablePage extends AppComponent {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }


    componentDidMount() {
        this.getToApi("apiUserV2", response => {
            this.setState({users:response.data})
        });
    }

    appRender(){

        const { classes } = this.props;

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(function(user, key) {

                            return (
                                <TableRow>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
export default withStyles(styles)(TablePage);