import Head from 'next/head';
import Layout from '../../components/Layout';
import axios from 'axios';
import Table from '../../components/Table';
import CreatePosition from '../../components/CreatePosition';
import { Create } from '@material-ui/icons';

const Positions = () => {
    const [positions, setPositions] = React.useState({});

    const labels = {
        title: 'Position Title',
        department_name: 'Department',
        created_date: 'Created Date',
        created_by: 'Created By',
    }

    const getPositionInfo = () => {
        axios({
            method: 'get',
            url: '/api/positions/getAll',
            withCredentials: true
        })
        .then((response) => {
            setPositions(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updatePositionInfo = (newPosition) => {
        let newArray = [...positions, newPosition];
        setPositions(newArray);
    }

    React.useEffect(() => {
        getPositionInfo();
    }, []);

    return (
        <div>
        <Head>
            <title>EMS Positions</title>
        </Head>
        <Layout>
            <div>
                <p>Positions Maintenance</p>
            </div>
            <CreatePosition updatePosition={updatePositionInfo}></CreatePosition>
            <div>
                <p>All Positions</p>
            </div>
            {positions.length > 0 ? <Table labels={labels} tableData={positions}/> : <p>Please wait</p>}           
        </Layout>

        </div>
    )};

  export default Positions;