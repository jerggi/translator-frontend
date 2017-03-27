import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../actions/dictionaryActions'
import DictionaryTable from '../components/DictionaryTable'

class Dictionaries extends Component {
    componentWillMount() {
        const { actions: { getDictionaries } } = this.props

        getDictionaries()
    }

    handleSelect(dict) {
        console.log(dict)
    }

    render() {
        const { dictionaries } = this.props;

        return (
            <div>
                <h2>Dictionaries</h2>

                <DictionaryTable dictionaries={dictionaries} handleSelect={this.handleSelect} />
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
