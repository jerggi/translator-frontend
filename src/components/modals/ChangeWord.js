import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-bootstrap'

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
            <Row>
                <Col md={8}><Field id="word" name="word" component={Input} label="Word" /></Col>
            </Row>

            <Row>
                <Col md={8}><Field id="newWord" name="newWord" component={Input} label="New word" /></Col>
            </Row>

            <Row>
                <Col md={8}><Field id="translation" name="translation" component={Input} label="Translation" /></Col>
            </Row>

            <Row>
                <Col md={8}><Field id="newTranslation" name="newTranslation" component={Input} label="New translation" /></Col>
            </Row>
        </div>
    )
}

const ChangeWordForm = reduxForm({
    form: 'changeWordForm',
    validate,
})(ChangeWord)

export default ChangeWordForm
