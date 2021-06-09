import { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import _ from 'lodash';

import AdminLayout from '../../../components/admin/Layout';
import { Store } from '../../../contextStore';
import { Admin } from '../../../utils/apiEndpoint';
import { GET } from '../../../utils/request';
import {
  formateDateOnly,
  getCurrentDate,
  STORETYPES,
} from '../../../utils/shared';
import 'react-calendar/dist/Calendar.css';

import { monthlyChart, weeklyChart } from '../../../utils/chart';

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);
  const [todayOrder, setTodayOrder] = useState([]);
  const [weeklyChartData, setWeeklyChartData] = useState({});
  const [weeklyOrderChartData, setWeeklyOrderChartData] = useState({});
  const [monthlyChartData, setMonthlyChartData] = useState({});
  const [monthlyOrderChartData, setMonthlyOrderChartData] = useState({});

  // calendar
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    // fetch movies
    const getMovies = async () => {
      const resp = await GET(Admin.adminMovies);
      // console.log('movies ', JSON.stringify(resp.data));
      if (resp && resp.data) {
        dispatch({ type: STORETYPES.MOVIES, payload: resp.data });
      }
    };

    // fetch rentals
    const fetchRentals = async () => {
      const resp = await GET(Admin.adminRentals);
      // console.log('user ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        dispatch({ type: STORETYPES.RENTALS, payload: resp.data });
      }
    };

    // fetch users
    const fetchUsers = async () => {
      const resp = await GET(Admin.adminUsers);
      // console.log('user ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        dispatch({ type: STORETYPES.USERS, payload: resp.data });
      }
    };

    getMovies();
    fetchRentals();
    fetchUsers();
  }, []);

  useEffect(() => {
    // try to set orders
    const todayOrders = _.filter(state.rentals, m => {
      return formateDateOnly(m.createdAt) === getCurrentDate();
    });
    setTodayOrder(todayOrders);

    //get weekly chart data
    const data = weeklyChart(state);
    setWeeklyChartData(data);

    // get weekly order chart data
    setWeeklyOrderChartData(data);

    // get monthly chart data
    const monthlyData = monthlyChart(state);
    setMonthlyChartData(monthlyData);

    // get monthly order chart
    setMonthlyOrderChartData(monthlyData);
  }, [state]);

  return (
    <AdminLayout title="VHS Movies | Dashboard">
      <h2 className="page-heading mb-5">Dashboard</h2>
      {/* {JSON.stringify(todayOrder)} */}
      {/* Dashboard grid */}
      <div className="">
        <div className="row ">
          <div className="col-md-9 col-sm-12 mb-2">
            <div className="row">
              <div className="col-md-3 col-sm-12 mb-2  ">
                <div
                  className="card dashboard-grid"
                  style={{ background: '#6475F9' }}
                >
                  <div className="card-body">
                    <h6 className="card-title text-end ">
                      TODAY'S HIRED MOVIES
                    </h6>
                    <h4 className="card-text text-center mt-5">
                      {todayOrder.length}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12  mb-2">
                <div
                  className="card dashboard-grid"
                  style={{ background: '#55AE54' }}
                >
                  <div className="card-body">
                    <h6 className="card-title text-end">TOTAL HIRED MOVIES</h6>
                    <h4 className="card-text text-center mt-5">
                      {state.rentals.length}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12  mb-2">
                <div
                  className="card  dashboard-grid"
                  style={{ background: '#50514F' }}
                >
                  <div className="card-body">
                    <h6 className="card-title text-end">TOTAL MOVIES</h6>
                    <h4 className="card-text text-center mt-5">
                      {state.movies.length}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-12  mb-2">
                <div
                  className="card  dashboard-grid"
                  style={{ background: '#F0A202' }}
                >
                  <div className="card-body">
                    <h6 className="card-title text-end">TOTAL USERS</h6>
                    <h4 className="card-text text-center mt-5">
                      {state.users.length}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12 mb-2">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>
        </div>
        {/* second row */}
        <br />
        <div className="row ">
          <h2 className="text-center mb-2">User Registration Graphs</h2>
          <div className="col-md-6 col-sm-12  mb-2 mt-2">
            <div className="card ">
              <div className="card-body text-dark">
                {/* {JSON.stringify(weeklyChartData.regs)} */}
                <Line
                  data={{
                    labels: weeklyChartData.regs && weeklyChartData.regs.label,
                    datasets: [
                      {
                        label: ' Weekly Registrations',
                        data: weeklyChartData.regs && weeklyChartData.regs.data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.5,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12  mb-2 mt-2">
            <div className="card ">
              <div className="card-body text-dark">
                {/* {JSON.stringify(weeklyChartData.regs)} */}
                <Line
                  data={{
                    labels:
                      monthlyChartData.regs && monthlyChartData.regs.label,
                    datasets: [
                      {
                        label: ' Monthly Registrations',
                        data:
                          monthlyChartData.regs && monthlyChartData.regs.data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.5,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Rentals chart */}
        <br />
        <div className="row ">
          <h2 className="text-center mb-2">Movies Hiring Graphs</h2>
          <div className="col-md-6 col-sm-12  mb-2 mt-2">
            <div className="card ">
              <div className="card-body text-dark">
                {/* {JSON.stringify(weeklyChartData.regs)} */}
                <Line
                  data={{
                    labels:
                      weeklyOrderChartData.rentals &&
                      weeklyOrderChartData.rentals.label,
                    datasets: [
                      {
                        label: ' Weekly Hirings',
                        data:
                          weeklyOrderChartData.rentals &&
                          weeklyOrderChartData.rentals.data,
                        backgroundColor: 'rgba(75, 192, 100, 0.2)',
                        fill: true,
                        tension: 0.5,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12  mb-2 mt-2">
            <div className="card ">
              <div className="card-body text-dark">
                {/* {JSON.stringify(weeklyChartData.regs)} */}
                <Line
                  data={{
                    labels:
                      monthlyOrderChartData.rentals &&
                      monthlyOrderChartData.rentals.label,
                    datasets: [
                      {
                        label: ' Monthly Hirings',
                        data:
                          monthlyOrderChartData.rentals &&
                          monthlyOrderChartData.rentals.data,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: true,
                        tension: 0.5,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
