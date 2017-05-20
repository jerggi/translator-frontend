import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { map } from 'lodash'
import * as C from '../utils/constants'

const dateToString = (ms) => {
    const date = new Date(ms)
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0'+ minutes : minutes
    const hours = date.getHours()
    const days = date.getDay()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return <span>{`${hours}:${minutes}`}&nbsp;{`${days}.${month}.${year}`}</span>
}

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
                    <TableHeaderColumn>Created at</TableHeaderColumn>
                    <TableHeaderColumn>Last time edited</TableHeaderColumn>
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
                                <TableRowColumn>
                                    <span>{dateToString(d.createdAt)}</span>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <span>{dateToString(d.lastEditedAt)}</span>
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
