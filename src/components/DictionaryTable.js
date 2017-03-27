import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { map, join } from 'lodash';
import * as C from '../utils/constants';

const DictionaryTable = ({ dictionaries, handleSelect }) => {
    return (
        <Table multiSelectable={true} width="100%" onRowSelection={handleSelect}>
            <TableHeader
                displaySelectAll={true}
                adjustForCheckbox={true}
                enableSelectAll={true}
            >
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={true}>
                {
                    map(dictionaries, d => (
                            <TableRow key={d.name}>
                                <TableRowColumn>{d.name}</TableRowColumn>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    )
}

export default DictionaryTable;
