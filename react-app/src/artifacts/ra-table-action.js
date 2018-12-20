import React, {Component} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import {ListItemIcon, MenuItem} from "@material-ui/core";
import DraftsIcon from '@material-ui/icons/Drafts';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import RaPagination from "./ra-pagination";

const ITEM_HEIGHT = 48;

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione'
];

export default class RaTableAction extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { editAction, viewAction, deleteAction } = this.props;
        let { others } = this.props;
        if (editAction){
            others.push(new ActionDefinition("Edit", editAction, Edit))
        }



        if (viewAction){
            others.push(new ActionDefinition("View", viewAction, Visibility))
        }

        if (deleteAction){
            others.push(new ActionDefinition("Delete", deleteAction, Delete))
        }

        console.log(others);

        let view = <React.Fragment/>;
        if (others.length !== 0){
            view = (
                <React.Fragment>
                    <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 200,
                            },
                        }}>
                        {options.map(option => (
                            <MenuItem key={option} onClick={this.handleClose}>
                                <ListItemIcon >
                                    <Edit/>
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </React.Fragment>
            );
        }
        return view;
    }
}

class ActionDefinition {

    label = "";
    action = undefined;
    icon = "";
    confirmation = {
        okayLabel: "Okay",
        okayFunction: null,
        cancelFunction: null,
        cancelLabel: "Cancel",
    };

    constructor(label, action, icon) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }
}

let actionMap = {
  label: "",
  action: "",
  icon: DraftsIcon,
  confirmation: {
      okayLabel: "Okay",
      okayFunction: null,
      cancelFunction: null,
      cancelLabel: "Cancel",
  },
};

RaTableAction.defaultProps = {
    editAction: undefined,
    viewAction: undefined,
    deleteAction: undefined,
    others: [],
};

RaTableAction.propTypes = {
    editAction: PropTypes.func,
    viewAction: PropTypes.func,
    deleteAction: PropTypes.func,
    others: PropTypes.array,
};
