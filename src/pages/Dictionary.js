import React, { Component, PropTypes } from 'react'
import { List, WindowScroller, AutoSizer } from 'react-virtualized'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'

import { Row, Col, Panel } from 'react-bootstrap'
import { map, join, isEmpty } from 'lodash'

import Modal from '../components/modals/Modal'
import ChangeWordForm from '../components/modals/ChangeWord'
import AddWordForm from '../components/modals/AddWord'
import DeleteWordModal from '../components/modals/DeleteWord'
import DeleteDictionaryModal from '../components/modals/DeleteDictionary'

import * as Actions from '../actions/dictionaryActions'
import * as Api from '../api/word'
import * as DictApi from '../api/dictionary'


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
    deleteWordModal: {
      open: false,
      initialValues: {},
    },
    deleteDictionaryModal: {
      open: false,
    },
    dictShowed: true,
  }

  componentDidMount() {
    this.getDictionary()
  }

  addWord = async () => {
    const { params: { dictionary } } = this.props.router
    const { addWordForm } = this.props.form

    if (addWordForm.syncErrors) {
      return
    }

    const word = addWordForm.values.word
    const translation = addWordForm.values.translation

    try {
      await Api.addWord(dictionary, word, translation)

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

    const word = changeWordForm.values.word
    const newWord = changeWordForm.values.newWord ? changeWordForm.values.newWord : null
    const newTranslation = changeWordForm.values.newTranslation

    try {
      await Api.changeWord(dictionary, word, newWord, newTranslation)

      this.closeModal()
      this.getDictionary()
    } catch (err) {
      console.error(err)
    }
  }

  deleteWord = async () => {
    const { params: { dictionary } } = this.props.router
    const word = this.state.deleteWordModal.initialValues.word

    try {
      await Api.deleteWord(dictionary, word)

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

  deleteDictionary = async () => {
    const { router } = this.props
    const { params: { dictionary } } = router
    try {
      await DictApi.deleteDictionary(dictionary)
      router.push('/dictionaries')
    } catch (err) {
      console.error(err)
    }
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
      deleteWordModal: {
        open: false,
        initialValues: {},
      },
      deleteDictionaryModal: {
        open: false,
      }
    })
  }

  rowRenderer = ({ key, index, style }) => {
    const words = this.props.dictionary.words

    return (
      <div key={key} style={style} className="dict-word">
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <p style={{ marginLeft: '10px' }}>Word <b>{words[index].word}</b></p>
          <Divider />
          <MenuItem primaryText="Change word" onClick={() => this.openModal('changeWorldForm', { word: words[index].word, newTranslation: words[index].translation })} />
          <MenuItem primaryText="Delete word" onClick={() => this.openModal('deleteWordModal', { word: words[index].word })} />
        </IconMenu>
        <div style={{ display: 'block' }}>
          <div style={{ color: '#049be5' }}>{words[index].word}</div>
          <div>{words[index].translation}</div>
        </div>
      </div>
    )
  }

  render() {
    const { params: { dictionary } } = this.props.router
    const words = this.props.dictionary.words

    return (
      <div>
        <div className="dict-header">
          <Panel>
            <Col sm={6} xs={12}>
              <h1 style={{ marginBottom: '20px' }}>{dictionary}</h1>
            </Col>
            <Col sm={6} xs={12}>
              <Row>
                <Col md={6} mdPush={3} sm={12} >
                  <RaisedButton className="dict-header__button" label="Add word" onClick={() => this.openModal('addWordForm')} />
                </Col>
              </Row>

              <Row>
                <Col md={6} mdPush={3} sm={12}>
                  <RaisedButton className="dict-header__button" label="Delete dictionary" onClick={() => this.openModal('deleteDictionaryModal')} />
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

          <Modal title="Delete word" open={this.state.deleteWordModal.open} handleSubmit={this.deleteWord} handleCancel={this.closeModal} >
            <DeleteWordModal word={this.state.deleteWordModal.initialValues.word} />
          </Modal>

          <Modal title="Delete dictionary" open={this.state.deleteDictionaryModal.open} handleSubmit={this.deleteDictionary} handleCancel={this.closeModal} >
            <DeleteDictionaryModal name={dictionary} />
          </Modal>
        </div>
        <div className="dict-words">
          <AutoSizer>
            {({ width, height }) => (
              <List

                height={height}
                width={width}
                rowCount={words.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer}

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
)(withRouter(Dictionary))

