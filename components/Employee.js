import React from 'react';
import Table from './Table';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CreateEmployee from '../components/CreateEmployee';

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
}));

const Employee = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h6" className={classes.header}>Employee Management</Typography>
            <CreateEmployee employeeList={props.employeeList} updateEmployee={props.updateEmployee}></CreateEmployee>
            <Typography variant="subtitle1" className={classes.header}>All Employees</Typography>
            {props.employees.length > 0 ? <Table labels={props.labels} tableData={props.employees}/> : <p>Please wait</p>}
        </div>
    )
}

export default Employee
