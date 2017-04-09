import React, { Component, PropTypes } from 'react'
import { List, WindowScroller, AutoSizer } from 'react-virtualized';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import { Row, Col, Panel } from 'react-bootstrap'
import { map, join, isEmpty } from 'lodash'

import Modal from '../components/modals/Modal'
import ChangeWordForm from '../components/modals/ChangeWord'
import AddWordForm from '../components/modals/AddWord'

import * as Actions from '../actions/dictionaryActions'
import * as Api from '../api/word'


class Dictionary extends Component {
  state = {
    addWordForm: {
      open: false,
      initialValues: {},
    },
    changeWorldForm: {
      open: false,
      initialValues: {},
    },
    deleteWordForm: {
      open: false,
      initialValues: {},
    },
    dictShowed: false,
  }

  addWord = async () => {
    const { params: { dictionary } } = this.props.router
    const { addWordForm } = this.props.form

    if (addWordForm.syncErrors) {
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

  changeWord = async () => {
    const { params: { dictionary } } = this.props.router
    const { changeWordForm } = this.props.form

    if (changeWordForm.syncErrors) {
      return
    }

    const word = changeWordForm.values.word ? changeWordForm.values.word : ''
    const newWord = changeWordForm.values.newWord ? changeWordForm.values.newWord : ''
    const translation = changeWordForm.values.translation ? changeWordForm.values.translation : ''
    const newTranslation = changeWordForm.values.newTranslation ? changeWordForm.values.newTranslation : ''

    try {
      await Api.changeWord(dictionary, word, newWord, translation, newTranslation)

      this.closeModal()
      this.getDictionary()
    } catch (err) {
      console.error(err)
    }
  }

  deleteWord = async () => {
    const { params: { dictionary } } = this.props.router
    const { deleteWordForm } = this.props.form

    if (deleteWordForm.syncErrors) {
      return
    }

    const word = deleteWordForm.values.word ? deleteWordForm.values.word : ''
    const translation = deleteWordForm.values.translation ? deleteWordForm.values.translation : ''

    try {
      await Api.deleteWord(dictionary, word, translations)

      this.closeModal()
      this.getDictionary()
    } catch (err) {
      console.error(err)
    }
  }

  openModal = (form, initialValues = {}) => {
    this.setState({
      [form]: {
        open: true,
        initialValues,
      },
    })
  }

  getDictionary = () => {
    const { params: { dictionary } } = this.props.router
    const { actions: { getDictionary } } = this.props

    this.setState({
      dictShowed: true,
    })

    getDictionary(dictionary)
  }

  closeModal = () => {
    this.setState({
      addWordForm: {
        open: false,
        initialValues: {},
      },
      changeWorldForm: {
        open: false,
        initialValues: {},
      },
      deleteWordForm: {
        open: false,
        initialValues: {},
      },
    })
  }

  render() {
    const { params: { dictionary } } = this.props.router
    const words = this.props.dictionary

    const rowRenderer = ({ key, index, style }) => (
      <div key={key} style={style} className="dict-word">
        <div>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <p style={{ marginLeft: '10px' }}>Word <b>{words[index].word}</b></p>
            <Divider />
            <MenuItem primaryText="Add translation" onClick={() => this.openModal('addWordForm', { word: words[index].word })} />
            <MenuItem primaryText="Change word" onClick={() => this.openModal('changeWorldForm', { word: words[index].word })} />
            <MenuItem primaryText="Delete word" onClick={() => this.openModal('deleteWordForm', { word: words[index].word })} />
          </IconMenu>
          <span>{words[index].word}: {words[index].translations.join('; ')}</span>
        </div>
      </div>
    )

    return (
      <div>
        <div className="dict-header">
          <Panel>
            <Col sm={6} xs={12}>

                <h1 style={{ marginBottom: '20px' }}>{dictionary}</h1>
                {!this.state.dictShowed && <RaisedButton onClick={this.getDictionary} label="Load dictionary" />}
  
            </Col>
            <Col sm={6} xs={12}>
              <Row>
                <Col md={6} mdPush={3} sm={12} >
                  <RaisedButton className="dict-header__button" label="Add world" onClick={() => this.openModal('addWordForm')} />
                </Col>
              </Row>
              <Row>
                <Col md={6} mdPush={3} sm={12}>
                  <RaisedButton className="dict-header__button" label="Change world" onClick={() => this.openModal('changeWorldForm')} />
                </Col>
              </Row>
              <Row>
                <Col md={6} mdPush={3} sm={12}>
                  <RaisedButton className="dict-header__button" label="Delete world" onClick={() => this.openModal('deleteWordForm')} />
                </Col>
              </Row>
            </Col>
          </Panel>

          <Modal title="Add word" open={this.state.addWordForm.open} handleSubmit={this.addWord} handleCancel={this.closeModal} >
            <AddWordForm initialValues={this.state.addWordForm.initialValues} />
          </Modal>

          <Modal title="Change word" open={this.state.changeWorldForm.open} handleSubmit={this.changeWord} handleCancel={this.closeModal} >
            <ChangeWordForm initialValues={this.state.changeWorldForm.initialValues} />
          </Modal>

          <Modal title="Delete word" open={this.state.deleteWordForm.open} handleSubmit={this.deleteWord} handleCancel={this.closeModal} >
            <ChangeWordForm initialValues={this.state.deleteWordForm.initialValues} />
          </Modal>
        </div>
        <div className="dict-words">
          <AutoSizer>
            {({ width, height }) => (
              <List

                height={height}
                width={width}
                rowCount={words.length}
                rowHeight={70}
                rowRenderer={rowRenderer}

              />
            )}
          </AutoSizer>
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

