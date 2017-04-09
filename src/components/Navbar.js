import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import { Link } from 'react-router';

const Navbar = ({ title }) => (
    <AppBar
        title={title}
        iconElementLeft={
            <IconMenu
                iconButtonElement={
                    <IconButton><MenuIcon color="#fff" /></IconButton>
                }
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem primaryText={
                    <Link to="/translate" style={{ textDecoration: 'none' }}>
                        Translate
                    </Link>
                } />
                <MenuItem primaryText={
                    <Link to="/dictionaries" style={{ textDecoration: 'none' }}>
                        Dictionaries
                    </Link>
                } />
            </IconMenu>
        }
    />
);

Navbar.PropTypes = {
    title: React.PropTypes.string
}

export default Navbar;
