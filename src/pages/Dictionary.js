import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../actions/dictionaryActions'

class Dictionary extends Component {
    componentWillMount() {

    }

    render() {
        const { params : { dictionary } } = this.props.router;

        return (
            <h1>Dictionary {dictionary}</h1>
        )
    }
}

function mapStateToProps(state) {
    return {
        dictionary: state.dictionary.dictionary,
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
)(Dictionary)

