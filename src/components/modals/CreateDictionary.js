import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Input from './Input'

const validate = (values) => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!/^[^<>:"/\|?*]*$/.test(values.name)) {
        errors.name = 'Name cannot contain following characters: < > : " / \\ | ? *'
    }

    return errors
}

const CreateDictionary = () => {
    return (
        <div>
            <Field id="name" name="name" component={Input} label="Name" />
        </div>
    )
}

const CreateDictionaryForm = reduxForm({
    form: 'createDictionaryForm',
    validate,
})(CreateDictionary)

export default CreateDictionaryForm
