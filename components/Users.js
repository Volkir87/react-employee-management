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

const Users = (props) => {

    const [allUsers, setAllUsers] = React.useState([]);

    React.useEffect(() => {
        if (props.users) {
            setAllUsers(props.users);
        }
    },[props.users]);

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

    return (
        <div>
            <Typography variant="h6" className={classes.header}>User Management</Typography>
            <CreateUser updateUser={props.updateUserInfo}/>
            <Typography variant="subtitle1" className={classes.header}>All Users</Typography>
            {allUsers ? <Table labels={labels} tableData={allUsers}/> : <p>Please wait</p>}
        </div>
    )};

  export default Users;