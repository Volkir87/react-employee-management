import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRecord from "./TableRecord";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import MatTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    input: {
        padding: '0.5px',
        borderStyle: 'solid',
        borderRadius: '3px',
        borderColor: '#C4C4C4',
        borderWidth: '1px',
        margin: '1px',
        width: '100%'
    }, 
    filter: {
        paddingTop: '0.5px',
        paddingBottom: '0.5px'
    }
  });

let Table = ({labels, tableData}) => {

    const classes = useStyles();

    const [data, setData] = useState({});
    const [sorting, setSortBy] = useState({
        sortOn: false,
        field: '',
        order: 'asc'
    });
    const [filter, setFilter] = useState({});

    // this is required for the state to be actually updated when we pass the props to the component
    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    // update the sorting state depending on the current sorting state
    const applySort = function(event){
        let field = event.target.id;
        if (sorting.field !== field) {
            setSortBy({sortOn: true, field: field, order: 'asc'});
        } else {
            if (sorting.sortOn && sorting.order === 'desc') {
                setSortBy({sortOn: false, field: '', order: 'asc'});
            } else if (sorting.sortOn && sorting.order === 'asc') {
                setSortBy({sortOn: true, field: field, order: 'desc'});
            } else {
                setSortBy({sortOn: true, field: field, order: 'asc'});
            }
        }
    }

    // update the filter state
    const applyFilter = function(event){
        let field = event.target.id;
        let value = event.target.value;
        setFilter({...filter, [field]: value});
    }

    // check which sorting symbol to show
    const checkSortSymbol = function(field){
        if (sorting.field === field && sorting.sortOn) {
            if (sorting.order === 'asc') {
                return <KeyboardArrowUpIcon fontSize='small'/>
            } else {
                return <KeyboardArrowDownIcon fontSize='small'/>
            }
        } else {
            return '';
        }
    }

    // if the sorting state changes, re-sort users and update corresponding state to re-render
    useEffect(() => {
        if (sorting.sortOn) {
            let sortedData = data.slice(0).sort((a,b) => { // IMPORTANT: I am creating a copy of the array, so that sorting does not mutate it (this issue drove me NUTS)
                let field = sorting.field;
                let result;
                if (sorting.order === 'asc') {
                    a[field] < b[field] ? result = -1 : a[field] > b[field] ? result = 1 : result = 0;
                } else {
                    a[field] > b[field] ? result = -1 : a[field] < b[field] ? result = 1 : result = 0;
                }
                return result;
            });
            setData(sortedData);
        }
    }, [sorting]);

    // if the filter state changes, filter the results and update users state to re-render
    useEffect(() => {
        if (Object.keys(filter).length === 0) {
            return;
        }
        console.log('tableData: ', tableData);
        console.log('filter: ', filter);
        let filteredData = tableData.slice(0).filter((v) => { 
            var result = true;
            for (let field of Object.keys(filter)) {
                console.log(v[field]);
                console.log(filter[field]);
                if (!(v[field].toString().toLowerCase().includes(filter[field].toString().toLowerCase()))) {
                    console.log('does not include')
                    console.log(result);
                    result = false;
                }
            }
            return result;
        });
        setData(filteredData);
    }, [filter]);

    return (
        <div>
            <TableContainer component={Paper}>
                <MatTable className={classes.table} stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow key='header'>
                        {tableData.length > 0 ? Object.keys(tableData[0]).map((v) => {
                            return <TableCell key={v} id={v} onClick={applySort}>{labels[v]}<span>{checkSortSymbol(v)}</span></TableCell>
                        }) : <TableCell>Please wait</TableCell>}
                    </TableRow>
                    <TableRow key='filters'>
                        {tableData.length > 0 ? Object.keys(tableData[0]).map((v) => {
                            return <TableCell key={v} className={classes.filter}><input className={classes.input} id={v} onChange={applyFilter}></input></TableCell>
                        }) : <TableCell>Please wait</TableCell>}
                    </TableRow>
                    </TableHead>
                    <TableBody key='body'>
                        {(data.length > 0) ? data.map((v, i) => <TableRecord key={i} record={v}/>) : <tr><td>No records found</td></tr>}
                    </TableBody>   
                </MatTable>                
            </TableContainer>
            {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
        </div>
    )
}

export default Table;