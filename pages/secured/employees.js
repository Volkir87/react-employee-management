import Head from 'next/head';
import Layout from '../../components/Layout';
import axios from 'axios';
import Table from '../../components/Table';

const Employees = () => {
    const [employees, setEmployees] = React.useState({});

    const labels = {
        first_name: 'First Name',
        last_name: 'Last Name',
        title: 'Title',
        name: 'Department',
        manager: 'Manager',
        start_date: 'Start Date'
    }

    const getEmployeeInfo = () => {
        axios({
            method: 'get',
            url: '/api/employees/getAll',
            withCredentials: true
        })
        .then((response) => {
            setEmployees(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updateEmployeeInfo = (newEmployee) => {
        let newArray = [...employees, newEmployee];
        setEmployees(newArray);
    }

    React.useEffect(() => {
        getEmployeeInfo();
    }, []);

    return (
        <div>
        <Head>
            <title>EMS Employees</title>
        </Head>
        <Layout>
            <div>
                <p>All Employess</p>
            </div>
            {employees.length > 0 ? <Table labels={labels} tableData={employees}/> : <p>Please wait</p>}
        </Layout>

        </div>
    )};

  export default Employees;