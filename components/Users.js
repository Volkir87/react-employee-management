import Head from 'next/head';
import Layout from './Layout';
import axios from 'axios';
import Table from './Table';
import CreateUser from './CreateUser';

const Users = () => {
    const [users, setUsers] = React.useState({});

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
            <div>
                <p>This is the users maintenance page</p>
            </div>
            <CreateUser updateUser={updateUserInfo}/>
            <div>
                <p>All users</p>
            </div>
            {users.length > 0 ? <Table labels={labels} tableData={users}/> : <p>Please wait</p>}
        </div>
    )};

  export default Users;