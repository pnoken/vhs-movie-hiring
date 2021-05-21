import AdminLayout from '../../../components/admin/Layout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h2 className="page-heading mb-5">Dashboard</h2>
      {/* Dashboard grid */}
      <div className="container">
        <div className="row ">
          <div className="col-md-4 col-sm-12 mb-2  ">
            <div
              className="card dashboard-grid"
              style={{ background: '#6475F9' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end ">TOTAL MOVIES</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12  mb-2">
            <div
              className="card dashboard-grid"
              style={{ background: '#55AE54' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end">HIRED MOVIES</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12  mb-2">
            <div
              className="card  dashboard-grid"
              style={{ background: '#D62728' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end">CANCELED MOVIES</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
        </div>
        {/* second row */}
        <br />
        <div className="row justify-content-center ">
          <div className="col-md-4 col-sm-12  mb-2">
            <div
              className="card dashboard-grid"
              style={{ background: '#50514F' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end">TOTAL USERS</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12  mb-2">
            <div
              className="card dashboard-grid"
              style={{ background: '#F0A202' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end">REVENUE</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12  mb-2">
            <div
              className="card  dashboard-grid"
              style={{ background: '#4655C7' }}
            >
              <div className="card-body">
                <h6 className="card-title text-end">TOTAL MOVIES</h6>
                <h4 className="card-text text-center mt-5">10,234</h4>
                <p className="text-start">20 new movies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
