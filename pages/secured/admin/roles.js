import Head from 'next/head';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Table from '../../../components/Table';
import AssignUserRole from '../../../components/AssignUserRole';
import createTypography from '@material-ui/core/styles/createTypography';

const Roles = () => {
    const [userRoles, setuserRoles] = React.useState({});

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
        <Head>
            <title>Role maintenance</title>
        </Head>
        <Layout>
            <div>
                <p>This is the user roles maintenance page</p>
            </div>
            <AssignUserRole update={updateUserInfo}/>
            <div>
                <p>All users and their roles</p>
            </div>
            {userRoles.length > 0 ? <Table labels={labels} tableData={userRoles}/> : <p>Please wait</p>}
        </Layout>

        </div>
    )};

  export default Roles;