import React from 'react'
import TextField from 'material-ui/TextField'

const Input = ({ input, id, meta: { touched, error } }) => (
    <TextField {...input} id={id} fullWidth={true} errorText={
        (touched && error) ? error : ''
    }/>
)

export default Input
