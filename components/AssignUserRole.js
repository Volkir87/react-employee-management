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
import Autocomplete from '@material-ui/lab/Autocomplete';

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
      display: 'flex',
      flexDirection: ''
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
        width: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

const AssignUserRole = ({update, allUsers, allRoles}) => {
    const classes = useStyles();

    const [message, setMessage] = React.useState({open: false, text: ''});
    const [user, setUser] = React.useState('');
    const [role, setRole] = React.useState('');
    const [userList, setAllUsers] = React.useState([]);
    const [roleList, setAllRoles] = React.useState([]);

    // using these hooks to watch for all users and all roles to display them on the list
    React.useEffect(() => {
        if (allUsers) {
            setAllUsers(allUsers);
        }
    }, [allUsers])

    React.useEffect(() => {
        if (allRoles) {
            setAllRoles(allRoles);
        }
    }, [allRoles])

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
        console.log("user: ", user);
        console.log("role: ", role);
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
                clearValues(['roleId']);
                setUser('');
                setRole('');
                console.log('response data data: ', response.data.data);
                update(response.data.data); //use the function supplied by the parent to update the state on the parent
            } else {
                setMessage({open: true, text: 'Unknown server response'});
            }
        })
        .catch((error) => {
            console.log(error);
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const handleUserSelection = (event, value) => {
        console.log("value: ", value);
        if (value) {
            setUser(value.id);
        } else {
            setUser('');
        }
        console.log("selected user: ", user);
    }

    const handleRoleSelection = (event) => {
        setRole(event.target.value);
    }
    
    const cancelAssignment = () => {
        clearValues(['roleId']);
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
                    {/* <FormControl className={classes.formControl}>
                        <InputLabel id="userIdLabel">User</InputLabel>
                        <Select
                        labelId="userIdLabel"
                        id="userId"
                        value={user}
                        onChange={handleUserSelection}
                        >
                        {(userList.length > 0) ? userList.map((v) => {
                            return <MenuItem key={v.id} value={v.id}>{v.user_id}</MenuItem>
                        }) : <p>Please wait...</p>}
                        </Select>
                    </FormControl> */}
                    <Autocomplete 
                        className={classes.formControl}
                        id="combo-box-user"
                        options={userList}
                        getOptionLabel={(userList) => userList.user_id}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="User" />}
                        onChange={handleUserSelection}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="roleIdLabel">Role</InputLabel>
                        <Select
                        labelId="roleIdLabel"
                        id="roleId"
                        value={role}
                        onChange={handleRoleSelection}
                        >
                        {(roleList.length > 0) ? roleList.map((v) => {
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