import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'

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
            <Row>
                <Col md={8}><Field id="name" name="name" component={Input} label="Name" /></Col>
            </Row>
        </div>
    )
}

const CreateDictionaryForm = reduxForm({
    form: 'createDictionaryForm',
    validate,
})(CreateDictionary)

export default CreateDictionaryForm
