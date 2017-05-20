import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { map, join } from 'lodash';
import * as C from '../utils/constants';

const TranslateTable = ( { translations } ) => {
    return (
        <Table width="100%">
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
            >
                <TableRow>
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
