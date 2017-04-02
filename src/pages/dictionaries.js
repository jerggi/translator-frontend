import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import Modal from '../components/modals/Modal'
import * as Actions from '../actions/dictionaryActions'
import DictionaryTable from '../components/DictionaryTable'

const NONE = 'none'
const ALL = 'all'

class Dictionaries extends Component {
    state = {
        selected: [],
        modalOpen: false,
    }

    componentWillMount() {
        const { actions: { getDictionaries } } = this.props

        getDictionaries()
    }

    handleSelect = (selected) => {
        this.setState({ selected })
    }

    handleModal = (open) => {
        this.setState({ modalOpen: open })
    }

    handleSubmit = () => {
        this.setState({ modalOpen: false })
    }

    render() {
        const { dictionaries } = this.props

        const fields = <p>field1</p>

        return (
            <div className="dict-table">
                <h2>Dictionaries</h2>

                <Modal open={this.state.modalOpen} handleSubmit={this.handleSubmit} handleCancel={() => this.handleModal(false)} >
                    {fields}
                </Modal>

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
