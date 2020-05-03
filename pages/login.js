import axios from 'axios';
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApplicationBar from '../components/ApplicationBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25rem',
        },
    },
    loginForm: {
            margin: theme.spacing(1),
            width: '25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            padding: '1rem',
            borderStyle: 'solid',
            borderColor: '#C4C4C4',
            borderWidth: '1px',
            borderRadius: '5px',
            textAlign: 'center'
        },
    loginArea: {
        margin: '3rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginItem: {
        margin: '0.5rem',
    },
    buttonArea: {
        display: 'flex',
        justifyContent: 'end'
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
            </Head>
            <ApplicationBar></ApplicationBar>
            <div className={classes.loginArea}>
                <form className={classes.loginForm} noValidate autoComplete="off">
                    <Typography variant='h6'>Login</Typography>
                    <TextField id="userId" className={classes.loginItem} label="User ID" variant="outlined"/>
                    <TextField id="password" className={classes.loginItem} label="Password" variant="outlined" type="password" autoComplete="current-password"/>
                    <div className={classes.buttonArea}>
                        <Button variant="contained" className={classes.loginItem} color="primary" onClick={login}>Login</Button>
                    </div>
                </form>
            </div>
        </div>
  )}

  export default Login