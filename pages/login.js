import axios from 'axios';
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    loginForm: {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch'
        },
}));

const Login = () => {
    const classes = useStyles(); // makes sure we are using the styles as defined above

    let login = () => {
        let user = document.getElementById('userId').value;
        let password = document.getElementById('password').value;
        axios({
            method: 'post',
            url: '/api/login',
            data: {
                username: user,
                password: password
            }
        })
        .then((response) => {
            console.log(response.status)
        })
        .catch((error) => {
            console.log('error response: ',error.response)
        });
    }

    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <form className={classes.loginForm} noValidate autoComplete="off">
                <TextField id="userId" label="User ID" variant="outlined"/>
                <TextField id="password" label="Password" variant="outlined"/>
                <Button variant="contained" color="primary" onClick={login}>Login</Button>
            </form>
        </div>
  )}

  export default Login