import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Select from 'react-select'
import { map, sortBy, findIndex } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import { getDictList, translate } from '../actions/translateActions'
import * as Actions from '../actions/translateActions'
import TranslateTable from '../components/TranslateTable'
import {put, get, SELECTED_DICTS} from '../utils/localStorage'
// import { translate, getDictList } from '../api/translate'

class Translate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            word: '',
            selectedDicts: '',
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

    translate() {
        const { actions: { translate } } = this.props

        const dicts = this.state.selectedDicts.length > 0 ? this.state.selectedDicts.split(',') : []

        translate(this.state.word, dicts)
        // translations: sortBy(translations, ['distance'])
    }

    handleWordChange(event) {
        this.setState({
            word: event.target.value,
        });
    }


    handleDictChange (dicts) {
        this.setState({
            selectedDicts: dicts
        })

        put(SELECTED_DICTS, dicts)
    }

    render() {
        const { dicts, translations } = this.props
        const dictOptions = map(dicts, option => Object.assign({}, { value: encodeURIComponent(option.name), label: option.name}))

        return (
            <div style={{ padding: '30px 30px' }}>
                <div>
                    <TextField name="word" onChange={(e) => this.handleWordChange(e)} floatingLabelText="Word"/>
                    <FlatButton label="Search" onClick={() => this.translate()} />

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
                <TranslateTable translations={translations}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        translations: state.translate.translations,
        dicts: state.translate.dicts,
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
