import Head from 'next/head';
import Layout from '../../components/Layout';
import axios from 'axios';
import Table from '../../components/Table';
import CreateDepartment from '../../components/CreateDepartment';

const Departments = () => {
    const [departments, setDepartments] = React.useState({});

    const labels = {
        name: 'Department',
        created_date: 'Created Date',
        created_by: 'Created By',
    }

    const getDepartmentInfo = () => {
        axios({
            method: 'get',
            url: '/api/departments/getAll',
            withCredentials: true
        })
        .then((response) => {
            setDepartments(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updateDepartmentInfo = (newDepartment) => {
        let newArray = [...departments, newDepartment];
        setDepartments(newArray);
    }

    React.useEffect(() => {
        getDepartmentInfo();
    }, []);

    return (
        <div>
            <Head>
                <title>EMS Departments</title>
            </Head>
            <Layout>
                <div>
                    <p>This is the departments maintenance page</p>
                </div>
                <CreateDepartment updateDepartment={updateDepartmentInfo}></CreateDepartment>
                <div>
                    <p>All Departments</p>
                </div>
                {departments.length > 0 ? <Table labels={labels} tableData={departments}/> : <p>Please wait</p>}
            </Layout>
        </div>
  )}

  export default Departments