import Head from 'next/head';
import Layout from './Layout';
import axios from 'axios';
import Table from './Table';
import CreateUser from './CreateUser';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
}));

const Users = () => {
    const [users, setUsers] = React.useState({});

    const classes = useStyles();

    const labels = {
        user_id: 'User ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        status_id: 'Status ID',
        status: 'Status',
        created_date: 'Created Date',
        created_by: 'Created By'
    }

    const getUserInfo = () => {
        axios({
            method: 'get',
            url: '/api/user/getAll',
            withCredentials: true
        })
        .then((response) => {
            console.log('calling API');
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updateUserInfo = (newUser) => {
        let newArray = [...users, newUser];
        setUsers(newArray);
    }

    // using useEffect hook to get all the users once the page is loaded (we don't need this info any time before that)
    React.useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <Typography variant="h6" className={classes.header}>User Management</Typography>
            <CreateUser updateUser={updateUserInfo}/>
            <Typography variant="subtitle1" className={classes.header}>All Users</Typography>
            {users.length > 0 ? <Table labels={labels} tableData={users}/> : <p>Please wait</p>}
        </div>
    )};

  export default Users;