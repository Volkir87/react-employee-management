import Head from 'next/head';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Table from '../../../components/Table';
import CreateUser from '../../../components/CreateUser';
import createTypography from '@material-ui/core/styles/createTypography';

const Users = () => {
    const [users, setUsers] = React.useState({});

    const labels = {
        user_id: 'User ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        status_id: 'Status ID',
        created_date: 'Created Date'
    }

    const getUserInfo = () => {
        axios({
            method: 'get',
            url: '/api/user/getAll',
            withCredentials: true
        })
        .then((response) => {
            console.log(response);
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    // using useEffect hook to get all the users once the page is loaded (we don't need this info any time before that)
    React.useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
        <Head>
            <title>User maintenance</title>
        </Head>
        <Layout>
            <div>
                <p>This is the users maintenance page</p>
            </div>
            <CreateUser/>
            <div>
                <p>All users</p>
            </div>
            {users.length > 0 ? <Table labels = {labels} tableData = {users}/> : <p>Please wait</p>}
        </Layout>

        </div>
    )};

  export default Users;