import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Input from './Input'

const validate = (values) => {
    const errors = {}

    if (!values.word) {
        errors.word = 'Required'
    }

    if (!values.translation) {
        errors.translation = 'Required'
    }

    return errors
}

const AddWord = () => {
    return (
        <div>
            <Field id="word" name="word" component={Input} label="Word" />
            <Field id="translation" name="translation" component={Input} label="Translation" />
        </div>
    )
}

const AddWordForm = reduxForm({
    form: 'addWordForm',
    validate,
})(AddWord)

export default AddWordForm
