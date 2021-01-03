import Head from 'next/head';
import Layout from '../../../components/Layout';
import Users from '../../../components/Users';
import Roles from '../../../components/Roles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

const AdminMain = () => {
    const [value, setValue] = React.useState(1);
    const [users, setUsers] = React.useState({});
    const [userRoles, setUserRoles] = React.useState({});
    const [allUsers, setAllUsers] = React.useState([]);
    const [allRoles, setAllRoles] = React.useState([]);

    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };

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
        getUserList();
    }

    const getUserRoleInfo = () => {
        axios({
            method: 'get',
            url: '/api/user/getRoles',
            withCredentials: true
        })
        .then((response) => {
            console.log('calling API');
            setUserRoles(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getUserList = () => {
        axios({
            method: 'get',
            url: '/api/user/getUserList',
            withCredentials: true
        })
        .then((result) => {
            setAllUsers(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const getRoleList = () => {
        axios({
            method: 'get',
            url: '/api/user/getRoleList',
            withCredentials: true
        })
        .then((result) => {
            setAllRoles(result.data);
        })
        .catch((error) => {
            setMessage({open: true, text: error.response.data.error});
        });
    }

    const findUserIndex = (userId) => {
        for (let i in userRoles) {
            if (userRoles[i].user_id === userId) {
                return i;
            }
        }
        return 0;
    }

    const updateUserRoleInfo = (newUserRole) => {
        let newArray = userRoles.slice(0);
        newArray[findUserIndex(newUserRole.user_id)] = newUserRole;
        setUserRoles(newArray);
    }

    // using useEffect hook to get all the users once the page is loaded (we don't need this info any time before that)
    React.useEffect(() => {
        getUserInfo();
        getUserRoleInfo();
        getUserList();
        getRoleList();
    }, []);

    return (
        <div>
        <Head>
            <title>EMS Admin</title>
        </Head>
        <Layout>
            <div>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                        aria-label="admin tabs"
                    >
                        <Tab label="Users" />
                        <Tab label="Roles"/>
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <Users users={users} updateUserInfo={updateUserInfo}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Roles userRoles={userRoles} updateUserRoleInfo={updateUserRoleInfo} allUsers={allUsers} allRoles={allRoles}/>
                </TabPanel>
            </div>
        </Layout>

        </div>
    )
}

export default AdminMain;