import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import Modal from '../components/modals/Modal'
import * as Actions from '../actions/dictionaryActions'
import DictionariesTable from '../components/DictionariesTable'
import CreateDictionaryForm from '../components/modals/CreateDictionary'
import {SORT_OPTIONS, SORT_PARAMS} from '../utils/constants'

class Dictionaries extends Component {
  state = {
    createDictForm: false,
    sort: {
      [SORT_PARAMS.NAME]: SORT_OPTIONS.ASC,
      [SORT_PARAMS.WORD_COUNT]: SORT_OPTIONS.ASC,
      [SORT_PARAMS.CREATED_AT]: SORT_OPTIONS.ASC,
      [SORT_PARAMS.EDITED_AT]: SORT_OPTIONS.ASC,
      active: null
    },
    sortedDictionaries: []
  }

  componentWillMount () {
    const { actions: { getDictionaries } } = this.props

    getDictionaries()
  }

  handleSort = (param) => {
    const {sort} = this.state
    
    if (sort.active === param) {
      const newValue = sort[param] === SORT_OPTIONS.ASC ? SORT_OPTIONS.DESC : SORT_OPTIONS.ASC
      this.setState({
        sort: {
          ...sort,
          [param]: newValue
        }
      })

      this.sortDictionaries(param, newValue)
    } else {
      this.setState({
        sort: {
          ...sort,
          active: param
        }
      })

      this.sortDictionaries(param, sort[param])
    }
  }

  sortDictionaries = (param, value) => {
    const { dictionaries } = this.props
    const isAsc = value === SORT_OPTIONS.ASC ? 1 : -1

    this.setState({
      sortedDictionaries: dictionaries.sort((d1, d2) => {
        if (param === SORT_PARAMS.NAME) {
          return isAsc * (d1.name.toUpperCase() > d2.name.toUpperCase() ? 1 : -1)
        } else if (param === SORT_PARAMS.WORD_COUNT) {
          return isAsc * (d1.wordCount - d2.wordCount)
        } else if (param === SORT_PARAMS.CREATED_AT) {
          return isAsc * (d1.createdAt - d2.createdAt)
        } else if (param === SORT_PARAMS.EDITED_AT) {
          return isAsc * (d1.lastEditedAt - d2.lastEditedAt)
        }
      })
    })
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
    const dictionaries = this.state.sortedDictionaries.length > 0 ? this.state.sortedDictionaries : this.props.dictionaries

    return (
      <div className="dict-table">
        <div className="dict-table__header">
          <RaisedButton label="Create dictionary" onClick={this.openModal} />
        </div>
        <DictionariesTable dictionaries={dictionaries} handleDictClick={this.handleDictClick} handleSort={this.handleSort} sort={this.state.sort} />

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
