import AppHead from "../../../components/AppHead";
import TopRow from "../../../components/adminDashboard/TopRow";
import ChartRow from "../../../components/adminDashboard/ChartRow";


const Dashboard = (): JSX.Element => {
    return (
        <>
            <AppHead pageTitle="VHS | Dashboard" />
            <TopRow />
            <hr />
            <ChartRow />
        </>
    );
};

export default Dashboard;
