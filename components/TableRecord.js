import React, { useState } from 'react';

let TableRecord = ({record}) => {
    let id = '';
    for (let key of Object.keys(record)) {
        id = id + record[key];
    };
    return(
        <tr>
            {Object.keys(record).map((v,i) => {
                return (
                    <td id={id}>{record[v]}</td>
                )
            })}
        </tr>
    )
}

export default TableRecord;