import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      flexDirection: 'column'
    },
    inputField: {
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
    },
    select: {
        display: 'none',
    }
}));

const LookupEmployee = () => {

    const classes = useStyles();
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [employee, setEmployee] = React.useState(0);
    const [employeeList, setEmployeeList] = React.useState([]);
    const [input, setInput] = React.useState('');

    const handleChange = (event) => {
        console.log('event.target: ', event.target);
        setEmployee(event.target.value[0]);
        let textField = document.getElementById('employeeID');
        textField.value = event.target.value[1];
        handleClose();
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleInput = (event) => {
        setInput(event.target.value);
        if (input.length > 2) {
            handleOpen();
        }
    }


    return (
        <div>
            
            <FormControl className={classes.formControl}>
                {/* <InputLabel id="demo-controlled-open-select-label">Age</InputLabel> */}
                <TextField id="employeeID" className={classes.inputField} label="Find Employee" variant="outlined" size="small" onChange={handleInput}/>
                <Select
                className={classes.select}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                value={''}
                onChange={handleChange}
                >
                    <MenuItem value={[10, 'Ten']}>Ten</MenuItem>
                    <MenuItem value={[20, 'Twenty']}>Twenty</MenuItem>
                    <MenuItem value={[30, 'Thirty']}>ThirtyThirtyThirtyThirtyThirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );

}

export default LookupEmployee;