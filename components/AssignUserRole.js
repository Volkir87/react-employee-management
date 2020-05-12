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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

const AssignUserRole = () => {
    const classes = useStyles();

    const [message, setMessage] = React.useState({open: false, text: ''});
    const [user, setUser] = React.useState('');
    const [role, setRole] = React.useState('');
    const [allUsers, setAllUsers] = React.useState([]);
    const [allRoles, setAllRoles] = React.useState([]);

    // using this hook to load all users and all roles to display them on the list
    React.useEffect(() => {
        axios({
            method: 'get',
            url: '/api/user/getUserList',
            withCredentials: true
        })
        .then((result) => {
            setAllUsers(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
        axios({
            method: 'get',
            url: '/api/user/getRoleList',
            withCredentials: true
        })
        .then((result) => {
            setAllRoles(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
    }, [])

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

    //function to handle assignment of a role to a user: make a call to the back end, and then display message on the response and update info on a page
    const handleAssignment = () => {
        if (user === '' || role === '') {
            setMessage({open: true, text: 'Both User ID and Role are required'});
            return;
        }
        axios({
            method: 'post',
            url: '/api/user/assignRole',
            data: {
                userId: user,
                roleId: role
            },
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                setMessage({open: true, text: 'Role assigned to a User successfully'});
                clearValues(['userId', 'roleId']);
                setUser('');
                setRole('');
                console.log('response data data: ', response.data.data);
                //updateUser(response.data.data); //use the function supplied by the parent to update the state on the parent
            } else {
                setMessage({open: true, text: 'Unknown server response'});
            }
        })
        .catch((error) => {
            console.log(error);
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const handleUserSelection = (event) => {
        setUser(event.target.value);
    }

    const handleRoleSelection = (event) => {
        setRole(event.target.value);
    }
    
    const cancelAssignment = () => {
        clearValues(['userId', 'roleId']);
        setUser('');
        setRole('');
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
                <Typography className={classes.heading}>Assign a Role to a User</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="userIdLabel">User</InputLabel>
                        <Select
                        labelId="userIdLabel"
                        id="userId"
                        value={user}
                        onChange={handleUserSelection}
                        >
                        {(allUsers.length > 0) ? allUsers.map((v) => {
                            return <MenuItem key={v.id} value={v.id}>{v.user_id}</MenuItem>
                        }) : <p>Please wait...</p>}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="roleIdLabel">Role</InputLabel>
                        <Select
                        labelId="roleIdLabel"
                        id="roleId"
                        value={role}
                        onChange={handleRoleSelection}
                        >
                        {(allRoles.length > 0) ? allRoles.map((v) => {
                            return <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>
                        }) : <p>Please wait...</p>}
                        </Select>
                    </FormControl>
                </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Button size="small" onClick={cancelAssignment}>Cancel</Button>
                <Button size="small" color="primary" onClick={handleAssignment}>Save</Button>
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

export default AssignUserRole;