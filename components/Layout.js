import ApplicationBar from './ApplicationBar';
import Drawer from './SideDrawer';
import Head from 'next/head';

const Layout = () => {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <ApplicationBar/>
            <Drawer/>
        </div>
    )
}

export default Layout;


