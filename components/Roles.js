import Head from 'next/head';
import Layout from './Layout';
import axios from 'axios';
import Table from './Table';
import AssignUserRole from './AssignUserRole';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
}));

const Roles = (props) => {

    const [allUserRoles, setUserRoles] = React.useState([]);

    const classes = useStyles();

    React.useEffect(() => {
        if (props.userRoles) {
            setUserRoles(props.userRoles);
        }
    },[props.userRoles]);

    const labels = {
        user_id: 'User ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        status_id: 'Status ID',
        status: 'Status',
        created_date: 'Created Date',
        created_by: 'Created By',
        assigned_by: 'Assigned By',
        assigned_date: 'Assigned Date',
        role_name: 'Role Name',
        role_description: 'Role Description'
    }

    return (
        <div>
            <Typography variant="h6" className={classes.header}>Role User Management</Typography>
            <AssignUserRole update={props.updateUserRoleInfo} allUsers={props.allUsers} allRoles={props.allRoles}/>
            <Typography variant="subtitle1" className={classes.header}>All User Roles</Typography>
            {allUserRoles ? <Table labels={labels} tableData={allUserRoles}/> : <p>Please wait</p>}
        </div>
    )};

  export default Roles;