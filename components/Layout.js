import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ApplicationBar from './ApplicationBar';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import Router from 'next/router'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        marginTop: '4rem'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginTop: '4rem'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        },
        marginTop: '4rem'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

const Layout = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawer = () => {
        if (open === true) {
            setOpen(false);
        } else {
            setOpen(true);
        }
        
    };

    const followLink = (link) => {
        Router.push(link);
    }

    return (
        <div>
            <ApplicationBar/>
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawer}>
                            {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button key='Employees' onClick={() => {followLink('/secured/employees')}}>
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary='Employees'/>
                        </ListItem>
                        <ListItem button key='Positions' onClick={() => {followLink('/secured/positions')}}>
                            <ListItemIcon><WorkIcon/></ListItemIcon>
                            <ListItemText primary='Positions'/>
                        </ListItem>
                        <ListItem button key='Departments' onClick={() => {followLink('/secured/departments')}}>
                            <ListItemIcon><AccountBalanceIcon/></ListItemIcon>
                            <ListItemText primary='Departments'/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key='Admin' onClick={() => {followLink('/secured/admin/main')}}>
                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                            <ListItemText primary='Admin'/>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    {/* <div className={classes.toolbar} /> */}
                        {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;