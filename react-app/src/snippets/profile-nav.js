import React from 'react';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DraftsIcon from '@material-ui/icons/Drafts';
import {
    ListItemIcon,MenuItem
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
                <AccountCircle
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