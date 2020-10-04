import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        height: 60,
      },
  }));

const CreatePosition = ({updatePosition}) => {
    const classes = useStyles();

    const [message, setMessage] = React.useState({open: false, text: ''});
    const [department, setDepartment] = React.useState('');
    const [allDepts, setAllDepts] = React.useState([]);

    React.useEffect(() => {
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
    }, []);

    //function to clear all elements
    let clearValues = (elements) => {
        for (let elem of elements) {
            document.getElementById(elem).value = '';
        }
    }

    //function to close the snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setMessage({open: false, text: ''});
      };

    //function to handle creation of a new department: make a call to the back end, and then display message on the response and update departments on a page
    const handleCreation = () => {
        //console.log('creating a dept');
        let positionName = document.getElementById('positionName').value;        
        let departmentName = document.getElementById('departmentName').value;
        if (departmentName === '' || positionName === '') {
            setMessage({open: true, text: 'All fields are required'});
            return;
        }
        axios({
            method: 'post',
            url: '/api/position/create',
            data: {
                departmentName: departmentName,
                positionName: positionName
            },
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                setMessage({open: true, text: 'Position created successfully'});
                clearValues(['departmentName', 'positionName']);
                updatePosition(response.data.data); //use the function supplied by the parent to update the state on the parent
            } else {
                setMessage({open: true, text: 'Unknown server response'});
            }
        })
        .catch((error) => {
            console.log('error: ', error);
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const cancelCreation = () => {
        clearValues(['departmentName', 'positionName']);
    }

    const handleDeptSelection = (event) => {
        setDepartment(event.target.value);
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
              <Typography className={classes.heading}>Create New Position</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="deptLabel">Department</InputLabel>
                    <Select
                    labelId="deptLabel"
                    id="deptId"
                    value={department}
                    onChange={handleDeptSelection}
                    >
                    {(allDepts.length > 0) ? allDepts.map((v) => {
                        return <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>
                    }) : <p>Please wait...</p>}
                    </Select>
                </FormControl>
                <TextField id="positionName" className={classes.inputField} label="Position Name" variant="outlined" size="small"/>
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

export default CreatePosition;