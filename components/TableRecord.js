import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

let TableRecord = ({record}) => {
    let id = '';
    for (let key of Object.keys(record)) {
        id = id + record[key];
    };
    return(
        <TableRow>
            {Object.keys(record).map((v,i) => {
                return (
                    <TableCell id={id}>{record[v]}</TableCell>
                )
            })}
        </TableRow>
    )
}

export default TableRecord;