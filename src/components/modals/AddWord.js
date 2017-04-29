import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'

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
            <Row>
                <Col md={8}><Field id="word" name="word" component={Input} label="Word" /></Col>
            </Row>

            <Row>
                <Col md={8}><Field id="translation" name="translation" component={Input} label="Translation" /></Col>
            </Row>
        </div>
    )
}

const AddWordForm = reduxForm({
    form: 'addWordForm',
    validate,
})(AddWord)

export default AddWordForm
