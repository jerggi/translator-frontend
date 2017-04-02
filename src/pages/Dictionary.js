import React, { Component, PropTypes } from 'react'
import { List, WindowScroller, AutoSizer } from 'react-virtualized';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-bootstrap'
import { map, join, isEmpty } from 'lodash'

import Modal from '../components/modals/Modal'
import ChangeWordForm from '../components/modals/ChangeWord'
import AddWordForm from '../components/modals/AddWord'

import * as Actions from '../actions/dictionaryActions'
import * as Api from '../api/word'


class Dictionary extends Component {
  state = {
    addWordForm: false,
    changeWorldForm: false,
    deleteWordForm: false,
    dictShowed: false,
  }

  addWord = async () => {
    const { params: { dictionary } } = this.props.router
    const { addWordForm } = this.props.form

    if (addWordForm.syncErros) {
      return
    }

    const word = addWordForm.values.word ? addWordForm.values.word : ''
    const translations = addWordForm.values.translation ? [addWordForm.values.translation] : ['']

    try {
      await Api.addWord(dictionary, word, translations)

      this.closeModal()
      this.getDictionary()
    } catch (err) {
      console.error(err)
    }
  }

  changeWord = () => {
    this.closeModal()
  }

  deleteWord = () => {
    this.closeModal()
  }

  openModal = (form) => {
    this.setState({
      [form]: true,
    })
  }

  getDictionary = () => {
    const { params: { dictionary } } = this.props.router
    const { actions: { getDictionary } } = this.props

    getDictionary(dictionary)
  }

  closeModal = () => {
    this.setState({
      addWordForm: false,
      changeWorldForm: false,
      deleteWordForm: false,
    })
  }

  render() {
    const { params: { dictionary } } = this.props.router
    const words = this.props.dictionary

    const rowRenderer = ({ key, index, style }) => (
      <div key={key} style={style}>
        {words[index].word}: {words[index].translations.join(', ')}
      </div>
    )

    return (
      <div>
        <div className="dict-header">
          <Row>
            <Col sm={6} xs={12}>
              <Row><h1>Dictionary {dictionary}</h1></Row>
              {isEmpty(words) && <Row><RaisedButton onClick={this.getDictionary} label="Load dictionary"/></Row>}
            </Col>
            <Col sm={6} xs={12}>
              <Row>
                <Col md={6} mdPush={3} sm={8} smPush={2}>
                  <RaisedButton className="dict-header__button" label="Add world" onClick={() => this.openModal('addWordForm')} />
                </Col>
              </Row>
              <Row>
                <Col md={6} mdPush={3} sm={8} smPush={2}>
                  <RaisedButton className="dict-header__button" label="Change world" onClick={() => this.openModal('changeWorldForm')} />
                </Col>
              </Row>
              <Row>
                <Col md={6} mdPush={3} sm={8} smPush={2}>
                  <RaisedButton className="dict-header__button" label="Delete world" onClick={() => this.openModal('deleteWordForm')} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal title="Add word" open={this.state.addWordForm} handleSubmit={this.addWord} handleCancel={this.closeModal} >
            <AddWordForm />
          </Modal>

          <Modal title="Change word" open={this.state.changeWorldForm} handleSubmit={this.changeWord} handleCancel={this.closeModal} >
            <ChangeWordForm />
          </Modal>

          <Modal title="Delete word" open={this.state.deleteWordForm} handleSubmit={this.deleteWord} handleCancel={this.closeModal} >
            <ChangeWordForm />
          </Modal>
        </div>
        <div className="dict-words">
          <WindowScroller>
            {
              ({ height, isScrolling, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      height={height}
                      width={width}
                      rowCount={words.length}
                      rowHeight={50}
                      rowRenderer={rowRenderer}
                      scrollTop={scrollTop}
                    />
                  )}
                </AutoSizer>
              )
            }
          </WindowScroller>
          {/*
            map(words, (translations, key) => {
              return (
                <div key={key}>
                  <p>{key} - {join(translations, ', ')}</p>
                </div>
              )
            })
          */}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dictionary: state.dictionary.dictionary,
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
)(Dictionary)

