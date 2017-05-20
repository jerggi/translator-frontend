import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Input from './Input'

const validate = (values) => {
    const errors = {}

    if (!values.word) {
        errors.word = 'Required'
    }

    return errors
}

const ChangeWord = () => {
    return (
        <div>
            <Field id="word" name="word" component={Input} label="Word" />
            <Field id="newWord" name="newWord" component={Input} label="New word" />
            <Field id="newTranslation" name="newTranslation" component={Input} label="New translation" />
        </div>
    )
}

const ChangeWordForm = reduxForm({
    form: 'changeWordForm',
    validate,
})(ChangeWord)

export default ChangeWordForm
