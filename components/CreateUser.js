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
  }));

const CreateUser = ({updateUser}) => {
    const classes = useStyles();

    const [message, setMessage] = React.useState({open: false, text: ''});

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

    //function to handle creation of a user: make a call to the back end, and then display message on the response and update users on a page
    const handleCreation = () => {
        let userId = document.getElementById('userID').value;
        let firstName = document.getElementById('userName').value;
        let lastName = document.getElementById('userLastName').value;
        let password = document.getElementById('initPwd').value;
        if (userId === '' || firstName === '' || lastName === '' || password === '') {
            setMessage({open: true, text: 'All fields are required'});
            return;
        }
        axios({
            method: 'post',
            url: '/api/user/create',
            data: {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                password: password
            },
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                setMessage({open: true, text: 'User created successfully'});
                clearValues(['userID', 'userName', 'userLastName', 'initPwd']);
                console.log('response data data: ', response.data.data);
                updateUser(response.data.data); //use the function supplied by the parent to update the state on the parent
            } else {
                setMessage({open: true, text: 'Unknown server response'});
            }
        })
        .catch((error) => {
            console.log(error);
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const cancelCreation = () => {
        clearValues(['userID', 'userName', 'userLastName', 'initPwd']);
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
              <Typography className={classes.heading}>Create New User</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
                <TextField id="userID" className={classes.inputField} label="User ID" variant="outlined"/>
                <TextField id="userName" className={classes.inputField} label="First Name" variant="outlined"/>
                <TextField id="userLastName" className={classes.inputField} label="Last Name" variant="outlined"/>
                <TextField id="initPwd" className={classes.inputField} label="Initial Password" variant="outlined"/>
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

export default CreateUser;