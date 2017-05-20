import React from 'react'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

const Navbar = ({ title, handlePageChange }) => (
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
                <MenuItem onClick={() => handlePageChange('/translate')} primaryText={
                    <a href="javascript:" style={{ textDecoration: 'none' }}>
                        Translate
                    </a>
                } />
                <MenuItem onClick={() => handlePageChange('/dictionaries')} primaryText={
                    <a href="javascript:" style={{ textDecoration: 'none' }}>
                        Dictionaries
                    </a>
                } />
            </IconMenu>
        }
    />
);

Navbar.PropTypes = {
    title: React.PropTypes.string
}

export default Navbar
