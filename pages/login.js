import axios from 'axios';

const Login = () => {
    let login = (user, password) => {
        axios({
            method: 'post',
            url: '/api/login',
            data: {
              userId: user,
              password: password
            }
          });
    }
    return (
    <div>
      <p>This is the login page</p>

    </div>
  )}

  export default Login