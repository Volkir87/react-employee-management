import Head from 'next/head';
import Layout from '../../../components/Layout';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = React.useState({});
    
    let getUserInfo = () => {
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
        </Layout>

        </div>
    )};

  export default Users;