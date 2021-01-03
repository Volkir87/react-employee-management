import Head from 'next/head';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Index = () => {

    const followLink = (link) => {
        Router.push(link);
    }
        
    return (
        <div>
        <Head>
            <title>Access Error</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <div>
            <Typography variant="h6">
            Error: Unauthorized Access. Access to this page is limited to administrators only.
            </Typography>
            <Button onClick={() => {followLink('/secured/dashboard')}}>Take me out of here</Button>
        </div>
        </div>
    )};

  export default Index