import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Select from 'react-select'
import { map, sortBy, findIndex } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import { getDictList, translate } from '../actions/translateActions'
import * as Actions from '../actions/translateActions'
import * as Api from '../api/word'
import TranslateTable from '../components/TranslateTable'
import Modal from '../components/modals/Modal'
import ChangeWordForm from '../components/modals/ChangeWord'
import DeleteWordModal from '../components/modals/DeleteWord'
import { put, get, SELECTED_DICTS } from '../utils/localStorage'

class Translate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: '',
            selectedDicts: '',
            isLoading: false,
            changeWordForm: {
                open: false,
                initialValues: {},
            },
            deleteWordModal: {
                open: false,
                initialValues: {},
            },
        }
    }

    componentDidMount() {
        const { actions: { getDictList } } = this.props

        getDictList().then((dicts) => {
            const selectedDicts = get(SELECTED_DICTS)

            if (selectedDicts) {
                const filteredDicts = selectedDicts.split(',')
                    .filter((name) => -1 !== findIndex(dicts, (d) => d.name === name))
                    .join(',')
                this.setState({ selectedDicts: filteredDicts })
            }
        })

    }

    async translate() {
        const { actions: { translate } } = this.props

        const dicts = this.state.selectedDicts.length > 0 ? this.state.selectedDicts.split(',') : []

        if (this.state.word) {
            this.setState({ isLoading: true })
            await translate(this.state.word, dicts)
            this.setState({ isLoading: false })
        }
        // translations: sortBy(translations, ['distance'])
    }

    openModal = (form, initialValues = {}) => {
        this.setState({
            [form]: {
                open: true,
                initialValues,
            },
        })
    }

    closeModal = () => {
        this.setState({
            changeWordForm: {
                open: false,
                initialValues: {},
            },
            deleteWordModal: {
                open: false,
                initialValues: {},
            },
        })
    }

    changeWord = async () => {
        const { changeWordForm } = this.props.form

        if (changeWordForm.syncErrors) {
            return
        }

        const word = changeWordForm.values.word
        const newWord = changeWordForm.values.newWord ? changeWordForm.values.newWord : null
        const newTranslation = changeWordForm.values.newTranslation
        const dictionary = this.state.changeWordForm.initialValues.dictionary

        try {
            await Api.changeWord(dictionary, word, newWord, newTranslation)

            this.closeModal()
            this.translate()
        } catch (err) {
            console.error(err)
        }
    }

    deleteWord = async () => {
        const word = this.state.deleteWordModal.initialValues.word
        const dictionary = this.state.deleteWordModal.initialValues.dictionary

        try {
            await Api.deleteWord(dictionary, word)

            this.closeModal()
            this.translate()
        } catch (err) {
            console.error(err)
        }
    }

    handleWordChange(event) {
        this.setState({
            word: event.target.value,
        });
    }

    handleKeyDown = (e) => {
        if (e.keyCode == 13 && !this.state.isLoading) {
            e.preventDefault()
            this.translate()
        }
    }


    handleDictChange(dicts) {
        this.setState({
            selectedDicts: dicts
        })

        put(SELECTED_DICTS, dicts)
    }

    render() {
        const { dicts, translations } = this.props
        const isLoading = this.state.isLoading
        const dictOptions = map(dicts, option => Object.assign({}, { value: encodeURIComponent(option.name), label: option.name }))

        return (
            <div style={{ padding: '30px 30px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <TextField name="word" style={{ width: '55%' }} onChange={(e) => this.handleWordChange(e)} floatingLabelText="Word" onKeyDown={this.handleKeyDown} />
                    <FlatButton label={isLoading ? 'Loading...' : 'Search'} onClick={() => this.translate()} disabled={isLoading} />

                    <Select
                        name="dictionary"
                        value={this.state.selectedDicts}
                        options={dictOptions}
                        multi={true}
                        simpleValue={true}
                        onChange={(value) => this.handleDictChange(value)}
                        placeholder="Select dictionaries..."
                    />
                </div>
                <TranslateTable translations={translations} openModal={this.openModal} />

                <Modal title="Change word" open={this.state.changeWordForm.open} handleSubmit={this.changeWord} handleCancel={this.closeModal} >
                    <ChangeWordForm initialValues={this.state.changeWordForm.initialValues} />
                </Modal>

                <Modal title="Delete word" open={this.state.deleteWordModal.open} handleSubmit={this.deleteWord} handleCancel={this.closeModal} >
                    <DeleteWordModal word={this.state.deleteWordModal.initialValues.word} />
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        translations: state.translate.translations,
        dicts: state.translate.dicts,
        form: state.form,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Translate)
