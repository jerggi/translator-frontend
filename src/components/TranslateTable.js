import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'

import Menu from 'material-ui/Menu';

import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'

import { map, join } from 'lodash';
import * as C from '../utils/constants';

const TranslateTable = ( { translations, openModal } ) => {
    return (
        <Table width="100%" selectable={false}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
            >
                <TableRow>
                    <TableHeaderColumn style={{ width: '50px', padding: '0px' }}></TableHeaderColumn>
                    <TableHeaderColumn>Word</TableHeaderColumn>
                    <TableHeaderColumn>Match</TableHeaderColumn>
                    <TableHeaderColumn>Dictionary</TableHeaderColumn>
                    <TableHeaderColumn>Translation</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    map(translations, t => (
                            <TableRow key={`${t.dict}_${t.key}`}>
                                <TableRowColumn style={{ width: '50px', padding: '0px' }}>
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                    >
                                        <p style={{ marginLeft: '10px' }}>Word <b>{t.key}</b></p>
                                        <Divider />
                                        <MenuItem primaryText="Change word" onClick={() => openModal('changeWordForm', { word: t.key, newTranslation: t.translation, dictionary: t.dict })} />
                                        <MenuItem primaryText="Delete word" onClick={() => openModal('deleteWordModal', { word: t.key, dictionary: t.dict })} />
                                    </IconMenu>
                                </TableRowColumn>
                                <TableRowColumn>{t.word}</TableRowColumn>
                                <TableRowColumn style={{ color: C.WORD_COLOR[t.distance] }}>{t.key}</TableRowColumn>
                                <TableRowColumn>{t.dict}</TableRowColumn>
                                <TableRowColumn style={{ whiteSpace: 'pre-line' }}>{t.translation}</TableRowColumn>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    )
}

export default TranslateTable;
