import Head from 'next/head';
import SideDrawer from '../../components/SideDrawer';
import Layout from '../../components/Layout';

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>EMS Dashboard</title>
      </Head>
      <Layout/>
      <div>
        <p>This is the dashboard page</p>
      </div>
    </div>
  )};

  export default Dashboard;