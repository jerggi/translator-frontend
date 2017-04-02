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
                <Col md={4}><label htmlFor="word">Word</label></Col>
                <Col md={8}><Field id="word" name="word" component={Input} /></Col>
            </Row>

            <Row>
                <Col md={4}><label htmlFor="newWord">New word</label></Col>
                <Col md={8}><Field id="newWord" name="newWord" component={Input} /></Col>
            </Row>

            <Row>
                <Col md={4}><label htmlFor="translation">Translation</label></Col>
                <Col md={8}><Field id="translation" name="translation" component={Input} /></Col>
            </Row>

            <Row>
                <Col md={4}><label htmlFor="newTranslation">New translation</label></Col>
                <Col md={8}><Field id="newTranslation" name="newTranslation" component={Input} /></Col>
            </Row>
        </div>
    )
}

const ChangeWordForm = reduxForm({
    form: 'changeWordForm',
    validate,
})(ChangeWord)

export default ChangeWordForm
