import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import { map, join } from 'lodash'
import * as C from '../utils/constants'

const DictionariesTable = ({ dictionaries }) => {
    return (
        <Table selectable={false} width="100%">
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
            >
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                {
                    map(dictionaries, d => (
                            <TableRow key={d.name} >
                                <TableRowColumn>
                                    <Link to={`dictionaries/${d.name}`}>
                                        <span>{d.name}</span>
                                    </Link>
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
