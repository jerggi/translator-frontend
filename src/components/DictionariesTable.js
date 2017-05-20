import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { map } from 'lodash'
import * as C from '../utils/constants'

const DictionariesTable = ({ dictionaries, handleDictClick }) => {
    return (
        <Table selectable={false} width="100%" onCellClick={handleDictClick}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
            >
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Word count</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                {
                    map(dictionaries, d => (
                            <TableRow key={d.name}>
                                <TableRowColumn>
                                    <span>{d.name}</span>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <span>{d.wordCount}</span>
                                </TableRowColumn>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    )
}

export default DictionariesTable
