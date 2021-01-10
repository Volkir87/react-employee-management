import Head from 'next/head';
import Layout from '../../components/Layout';
import axios from 'axios';
import LookupEmployee from '../../components/LookupEmployee';
import Employee from '../../components/Employee';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



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

const Employees = () => {
    const [employees, setEmployees] = React.useState({});
    const [employeeList, setEmployeeList] = React.useState([]);
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
      };

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

    
    const getEmployeeList = () => {
        axios({
            method: 'get',
            url: '/api/employees/getList',
            withCredentials: true
        })
        .then((response) => {
            setEmployeeList(response.data);
            console.log('Response List: ', response.data);
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
        getEmployeeList();
    }, []);

    return (
        <div>
        <Head>
            <title>EMS Employees</title>
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
                        <Tab label="All Employees" />
                        <Tab label="Transfer Employees" disabled="true"/>
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <Employee labels={labels} employees={employees} employeeList={employeeList} updateEmployee={updateEmployeeInfo}></Employee>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <Roles userRoles={userRoles} updateUserRoleInfo={updateUserRoleInfo} allUsers={allUsers} allRoles={allRoles}/> */}
                </TabPanel>
            </div>            
        </Layout>

        </div>
    )};

  export default Employees;