import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DraftsIcon from '@material-ui/icons/Drafts';
import {
    ListItemIcon, ListItemText, FormControl, InputLabel, Radio,
    Select,MenuItem, FormHelperText, Checkbox, FormGroup, FormLabel,RadioGroup,
    Card, CardContent, CardActions, CardHeader, Grid
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione'
];

const ITEM_HEIGHT = 48;

class ProfileNav extends React.Component {
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

        return (
            <div>
                <AccountCircle src="/assets/logo.png"
                    onClick={this.handleClick}>
                    <MoreVertIcon />
                </AccountCircle >
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
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                            <ListItemIcon >
                                <DraftsIcon />
                            </ListItemIcon>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default ProfileNav;