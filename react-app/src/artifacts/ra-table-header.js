import RaViewComponent from "./ra-view-component";
import React from "react";
import {
    TableRow, TableCell, TableHead, TableBody, TableFooter, TablePagination, Menu, MenuItem,
    TableSortLabel, Table, FormControlLabel, Checkbox, FormGroup, FormLabel, RadioGroup,
    IconButton, CardContent, Typography, CardActions, CardHeader, CardMedia, Tooltip, Button, Grid, TextField
} from '@material-ui/core';


class RaTableHeader extends RaViewComponent {



    appRender() {
        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}>

                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}>

                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}>

                                        {row.label}
                                    </TableSortLabel>

                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell numeric>
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }

}