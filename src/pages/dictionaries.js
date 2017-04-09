import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import Modal from '../components/modals/Modal'
import * as Actions from '../actions/dictionaryActions'
import DictionariesTable from '../components/DictionariesTable'

class Dictionaries extends Component {
    componentWillMount() {
        const { actions: { getDictionaries } } = this.props

        getDictionaries()
    }

    render() {
        const { dictionaries } = this.props

        const fields = <p>field1</p>

        return (
            <div className="dict-table">
                <h2>Dictionaries</h2>
                <DictionariesTable dictionaries={dictionaries} />
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        dictionaries: state.dictionary.dictionaries,
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
)(Dictionaries)
