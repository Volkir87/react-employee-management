import Head from 'next/head';
import Layout from '../../../components/Layout';
import Users from '../../../components/Users';
import Roles from '../../../components/Roles';
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

const AdminMain = () => {
    const [value, setValue] = React.useState(1);

    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };

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
                    <Users/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Roles/>
                </TabPanel>
            </div>
        </Layout>

        </div>
    )
}

export default AdminMain;