import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Modal = ({ open, title, handleSubmit, handleCancel, children }) => {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleCancel}
        />,
        <FlatButton
            label="Submit"
            type="submit"
            primary={true}
            onTouchTap={handleSubmit}
        />,
    ]

    return (
        <Dialog
            title={title}
            actions={actions}
            modal={true}
            open={open}
            autoDetectWindowHeight={false}
        >
            {children}
        </Dialog>
    )
}

export default Modal
