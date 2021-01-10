import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '100%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    inputField: {
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
        // display: 'flex',
        width: 180,
        justifyContent: 'center'
    },
    formControl: {
        marginRight: '0.5rem',
        marginLeft: '0.5rem',
        minWidth: 180,
        height: 60,
      },
  }));

const CreateEmployee = (props) => {
    const classes = useStyles();

    const [message, setMessage] = React.useState({open: false, text: ''});
    const [department, setDepartment] = React.useState('');
    const [allDepts, setAllDepts] = React.useState([]);
    const [departmentPositions, setDepartmentPositions] = React.useState([]);
    const [positionsList, setPositionsList] = React.useState([]);
    const [position, setPosition] = React.useState('');
    const [manager, setManager] = React.useState('');

    React.useEffect(() => {
        getDeptList();
        getDepartmentPositions();
    }, []);

    const getDepartmentPositions = () => {
        axios({
            method: 'get',
            url: '/api/positions/getDepartmentPositions',
            withCredentials: true
        })
        .then((result) => {
            setDepartmentPositions(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const getDeptList = () => {
        axios({
            method: 'get',
            url: '/api/departments/getDeptList',
            withCredentials: true
        })
        .then((result) => {
            setAllDepts(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
    }

    //function to clear all elements
    let clearValues = (elements) => {
        for (let elem of elements) {
            document.getElementById(elem).value = '';
        }
    }

    //function to close the snackbar
    let handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessage({open: false, text: ''});
      };

    //function to handle onboarding of a new employee: make a call to the back end, and then display message on the response and update employees on a page
    const handleCreation = () => {
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let startDate = document.getElementById('startDate').value;
        if (firstName === '' || lastName === '' || startDate === '' || manager === '' || position === '') {
            setMessage({open: true, text: 'All fields are required'});
            return;
        }
        axios({
            method: 'post',
            url: '/api/employees/create',
            data: {
                firstName: firstName,
                lastName: lastName,
                startDate: startDate,
                managerId: manager,
                positionId: position,
            },
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                setMessage({open: true, text: 'Employee created successfully'});
                clearValues(['firstName', 'lastName', 'startDate', 'manager']);
                props.updateEmployee(response.data.data); //use the function supplied by the parent to update the state on the parent
            } else {
                setMessage({open: true, text: 'Unknown server response'});
            }
        })
        .catch((error) => {
            console.log(error);
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const handleDeptSelection = (event) => {
        setDepartment(event.target.value);
        console.log('deparment: ', department);
        console.log('event: ', event.target.value);
        let newList = departmentPositions.filter((v) => {
            return v.department_id === event.target.value;
        });
        setPositionsList(newList);
    }

    const handlePositionSelection = (event) => {
        setPosition(event.target.value);
    }

    const handleManagerSelection = (event, value) => {
        if (value) {
            setManager(value.id);
        } else {
            setManager('');
        }
    }

    const cancelCreation = () => {
        clearValues(['firstName', 'lastName', 'startDate', 'manager']);
    }

    return (
        <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Create New Employee</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
                <TextField id="firstName" className={classes.inputField} label="First Name" variant="outlined" size="small"/>
                <TextField id="lastName" className={classes.inputField} label="Last Name" variant="outlined" size="small"/>
                <TextField id="startDate" className={classes.inputField} label="Start Date" type="date" variant="outlined" size="small" defaultValue="" 
                InputLabelProps={{
                shrink: true,
                }}/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="deptLabel">Department</InputLabel>
                    <Select
                    labelId="deptLabel"
                    id="departmentName"
                    value={department}
                    onChange={handleDeptSelection}
                    size="small"
                    >
                    {(allDepts.length > 0) ? allDepts.map((v) => {
                        return <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>
                    }) : <p>Please wait...</p>}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="deptLabel">Position</InputLabel>
                    <Select
                    labelId="posLabel"
                    id="positionName"
                    value={position}
                    onChange={handlePositionSelection}
                    size="small"
                    >
                    {(positionsList.length > 0) ? positionsList.map((v) => {
                        return <MenuItem key={v.position_id} value={v.position_id}>{v.title}</MenuItem>
                    }) : <p>Please wait...</p>}
                    </Select>
                </FormControl>
                <Autocomplete 
                        className={classes.formControl}
                        id="combo-box-manager"
                        options={props.employeeList}
                        getOptionLabel={(employeeList) => employeeList.name}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Manager" />}
                        onChange={handleManagerSelection}
                    />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small" onClick={cancelCreation}>Cancel</Button>
            <Button size="small" color="primary" onClick={handleCreation}>Save</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        <Snackbar
            className={classes.snackbarError}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            open={message.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message.text}
            action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
      </div>
    );
}

export default CreateEmployee
