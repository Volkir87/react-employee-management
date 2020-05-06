import React, { useState, useEffect } from 'react';
import TableRecord from "./TableRecord";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

let Table = ({labels, tableData}) => {

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
            <table className='table table-striped mt-5'>
                <thead className='thead-dark'>
                <tr>
                    {tableData.length > 0 ? Object.keys(tableData[0]).map((v) => {
                        return <th id={v} onClick={applySort}>{labels[v]}<span>{checkSortSymbol(v)}</span></th>
                    }) : <th>Please wait</th>}
                </tr>
                <tr>
                    {tableData.length > 0 ? Object.keys(tableData[0]).map((v) => {
                        return <th><input id={v} onChange={applyFilter}></input></th>
                    }) : <th>Please wait</th>}
                </tr>
                </thead>
                <tbody>
                    {(data.length > 0) ? data.map((v) => <TableRecord record={v}/>) : <tr><td>No records found</td></tr>}
                </tbody>   
            </table>                
        </div>
    )
}

export default Table;