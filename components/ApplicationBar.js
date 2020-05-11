import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Toolbar from '@material-ui/core/ToolBar';

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
                    %User%
                </Typography>
            </Toolbar>
        </AppBar>
        {/* second Toolbar is to shift content down (this is advised by Material-UI) */}
        <Toolbar/>
    </div>
    )
}

export default ApplicationBar;