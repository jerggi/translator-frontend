import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import Modal from '../components/modals/Modal'
import * as Actions from '../actions/dictionaryActions'
import DictionariesTable from '../components/DictionariesTable'
import CreateDictionaryForm from '../components/modals/CreateDictionary'

class Dictionaries extends Component {
  state = {
    createDictForm: false,
  }

  componentWillMount () {
    const { actions: { getDictionaries } } = this.props

    getDictionaries()
  }

  openModal = () => {
    this.setState({
      createDictForm: true,
    })
  }

  closeModal = () => {
    this.setState({
      createDictForm: false,
    })
  }

  createDictionary = (values) => {
    const { actions: { createDictionary } } = this.props
    const { createDictionaryForm } = this.props.form

    if (createDictionaryForm.syncErrors) {
      return
    }
    
    createDictionary(createDictionaryForm.values.name)
    this.closeModal()
  }

  handleDictClick = (index) => {
    const { dictionaries, router } = this.props
    const name = encodeURIComponent(dictionaries[index].name)
    
    router.push(`/dictionaries/${name}`)
  }

  render () {
    const { dictionaries } = this.props

    return (
      <div className="dict-table">
        <div className="dict-table__header">
          <RaisedButton label="Create dictionary" onClick={this.openModal} />
        </div>
        <DictionariesTable dictionaries={dictionaries} handleDictClick={this.handleDictClick} />

        <Modal title="Create dictionary" open={this.state.createDictForm} handleSubmit={this.createDictionary} handleCancel={this.closeModal} >
          <CreateDictionaryForm />
        </Modal>

      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    dictionaries: state.dictionary.dictionaries,
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
)(withRouter(Dictionaries))
