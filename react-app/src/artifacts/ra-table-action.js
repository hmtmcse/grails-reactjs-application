import React, {Component} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import {ListItemIcon, MenuItem, Icon} from "@material-ui/core";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import ListIcon from '@material-ui/icons/List';
import _ from 'lodash';


export default class RaTableAction extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const {tableActions} = this.props;
        return (
            <React.Fragment>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    <ListIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            minWidth: 150,
                        },
                    }}>
                    {
                        _.map(tableActions, (actionDefinition, key) => {
                            return (
                                <MenuItem key={key}>
                                    <ListItemIcon>
                                        {actionDefinition.icon ? (<actionDefinition.icon/>) : (<ErrorIcon/>)}
                                    </ListItemIcon>
                                    {actionDefinition.label}
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            </React.Fragment>
        );
    }
}
RaTableAction.propTypes = {
    tableActions: PropTypes.object.isRequired,
};


export class ActionDefinition {

    label = "";
    action = undefined;
    icon = ErrorIcon;
    confirmation = undefined;

    constructor(label, action, icon) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    addConfirmation() {
        this.confirmation = {
            okayLabel: "Okay",
            okayFunction: null,
            cancelFunction: null,
            cancelLabel: "Cancel",
        };
    }

    static commonActions() {
        return {
            viewAction: ActionDefinition.instance("View", undefined, Visibility),
            editAction: ActionDefinition.instance("Edit", undefined, Edit),
            deleteAction: ActionDefinition.instance("Delete", undefined, Delete),
        }
    }


    static instance(label, action, icon) {
        return new ActionDefinition(label, action, icon)
    }
}
