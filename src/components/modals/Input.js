import React from 'react'
import TextField from 'material-ui/TextField'

const Input = ({ input, label, id, meta: { touched, error } }) => (
    <TextField {...input} floatingLabelText={label} id={id} fullWidth={true} errorText={
        (touched && error) ? error : ''
    }/>
)

export default Input
