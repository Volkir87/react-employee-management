import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Toolbar from '@material-ui/core/ToolBar';
import axios from 'axios';

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
                <Typography variant="subtitle2">
                    {(user.data) ? user.data.user : '-'}
                </Typography>
            </Toolbar>
        </AppBar>
        {/* second Toolbar is to shift content down (this is advised by Material-UI) */}
        <Toolbar/>
    </div>
    )
}


export default ApplicationBar;