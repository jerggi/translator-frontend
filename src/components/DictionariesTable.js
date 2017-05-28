import React, { Component, PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import { map } from 'lodash'

import {SORT_OPTIONS, SORT_PARAMS} from '../utils/constants'

const dateToString = (ms) => {
    const date = new Date(ms)
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0'+ minutes : minutes
    const hours = date.getHours()
    const days = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return <span>{`${days}.${month}.${year}`}&nbsp;{`${hours}:${minutes}`}</span>
}

const DictionariesTable = ({ dictionaries, handleDictClick, handleSort, sort }) => {
    return (
        <Table selectable={false} width="100%" onCellClick={handleDictClick}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
            >
                <TableRow>
                    <TableHeaderColumn className={sort.active === SORT_PARAMS.NAME ? 'active' : 'inactive'}>
                        <span>Name</span>
                        <IconButton onClick={() => handleSort(SORT_PARAMS.NAME)}>
                            {sort[SORT_PARAMS.NAME] === SORT_OPTIONS.ASC ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </IconButton>
                    </TableHeaderColumn>
                    <TableHeaderColumn className={sort.active === SORT_PARAMS.WORD_COUNT ? 'active' : 'inactive'}>
                        <span>Word count</span>
                        <IconButton onClick={() => handleSort(SORT_PARAMS.WORD_COUNT)}>
                            {sort[SORT_PARAMS.WORD_COUNT] === SORT_OPTIONS.ASC ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </IconButton>
                    </TableHeaderColumn>
                    <TableHeaderColumn className={sort.active === SORT_PARAMS.CREATED_AT ? 'active' : 'inactive'}>
                        <span>Created at</span>
                        <IconButton onClick={() => handleSort(SORT_PARAMS.CREATED_AT)}>
                            {sort[SORT_PARAMS.CREATED_AT] === SORT_OPTIONS.ASC ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </IconButton>
                    </TableHeaderColumn>
                    <TableHeaderColumn className={sort.active === SORT_PARAMS.EDITED_AT ? 'active' : 'inactive'}>
                        <span>Last time edited</span>
                        <IconButton onClick={() => handleSort(SORT_PARAMS.EDITED_AT)}>
                            {sort[SORT_PARAMS.EDITED_AT] === SORT_OPTIONS.ASC ? (
                                <ArrowDropUp />
                            ) : (
                                <ArrowDropDown />
                            )}
                        </IconButton>
                    </TableHeaderColumn>
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
