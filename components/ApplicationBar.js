import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: '1rem'
    },
  }));

const ApplicationBar = () => {
    const [user, setUser] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const followLink = (link) => {
        Router.push(link);
    }

    const handleClick = (event) => {
        console.log("user ", user);
        if (user.data.user) {
            setAnchorEl(event.currentTarget);
        }
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        axios({
            method: 'get',
            url: '/api/logout',
            withCredentials: true
        })
        .then(followLink('/login'));
        handleClose();
      };

    const getUser = () => {
        axios({
            method: 'get',
            url: '/api/user/getCurrent',
            withCredentials: true
        })
        .then((response) => {
            setUser(response);
            console.log('user: ', user.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // using useEffect hook to get the user once the page is loaded
    React.useEffect(() => {
        getUser();
    }, []);

    const classes = useStyles();
    return (
    <div className={classes.root}>
        <AppBar position='fixed'>
            <Toolbar>
                <PeopleAltIcon style={{ color: 'white'}}/>
                <Typography variant="h6" className={classes.title}>
                    Employee Management System
                </Typography>
                <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick}>
                    {(user.data) ? ((user.data.user) ? user.data.user : '-') : '-' }
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disabled="true">Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        {/* second Toolbar is to shift content down (this is advised by Material-UI) */}
        <Toolbar/>
    </div>
    )
}


export default ApplicationBar;