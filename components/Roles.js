import Head from 'next/head';
import Layout from './Layout';
import axios from 'axios';
import Table from './Table';
import AssignUserRole from './AssignUserRole';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
}));

const Roles = () => {
    const [userRoles, setuserRoles] = React.useState({});

    const classes = useStyles();

    const labels = {
        user_id: 'User ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        status_id: 'Status ID',
        status: 'Status',
        created_date: 'Created Date',
        created_by: 'Created By',
        assigned_by: 'Assigned By',
        assigned_date: 'Assigned Date',
        role_name: 'Role Name',
        role_description: 'Role Description'
    }

    const getUserInfo = () => {
        axios({
            method: 'get',
            url: '/api/user/getRoles',
            withCredentials: true
        })
        .then((response) => {
            console.log('calling API');
            setuserRoles(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const findUserIndex = (userId) => {
        for (let i in userRoles) {
            if (userRoles[i].user_id === userId) {
                return i;
            }
        }
        return 0;
    }

    const updateUserInfo = (newUserRole) => {
        let newArray = userRoles.slice(0);
        newArray[findUserIndex(newUserRole.user_id)] = newUserRole;
        setuserRoles(newArray);
    }

    // using useEffect hook to get all the users once the page is loaded (we don't need this info any time before that)
    React.useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <Typography variant="h6" className={classes.header}>Role User Management</Typography>
            <AssignUserRole update={updateUserInfo}/>
            <Typography variant="subtitle1" className={classes.header}>All User Roles</Typography>
            {userRoles.length > 0 ? <Table labels={labels} tableData={userRoles}/> : <p>Please wait</p>}
        </div>
    )};

  export default Roles;