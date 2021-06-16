import { useContext, useEffect, useState } from 'react';
import RangePicker from 'react-range-picker';
import { useForm } from 'react-hook-form';

import { Dropdown, Form, Row, Col, Button } from 'react-bootstrap';
import AdminLayout from '../../../components/admin/Layout';
import { formateDateOnly, STORETYPES } from '../../../utils/shared';
import { Store } from '../../../contextStore';
import { GET } from '../../../utils/request';
import { Admin } from '../../../utils/apiEndpoint';
import TopUpReports from '../../../components/admin/reports/TopUpReports';

const Report = () => {
  const { state, dispatch } = useContext(Store);

  const [selected, setSelected] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resp;
      switch (selected) {
        case 'topups':
          resp = await GET(Admin.adminTopupHistory);
          if (resp && resp.data) {
            dispatch({ type: STORETYPES.TOPUPS, payload: resp.data });
          }
          break;
        case 'users':
          resp = await GET(Admin.adminUsers);
          if (resp && resp.data) {
            dispatch({ type: STORETYPES.USERS, payload: resp.data });
          }
          break;
        case 'movies':
          resp = await GET(Admin.adminMovies);
          if (resp && resp.data) {
            dispatch({ type: STORETYPES.MOVIES, payload: resp.data });
          }
          break;
        case 'rentals':
          resp = await GET(Admin.adminRentals);
          if (resp && resp.data) {
            dispatch({ type: STORETYPES.RENTALS, payload: resp.data });
          }
          break;
        case 'payments':
          resp = await GET(Admin.adminPayments);
          if (resp && resp.data) {
            dispatch({ type: STORETYPES.PAYMENTS, payload: resp.data.data });
          }
          break;

        default:
          break;
      }
    };
    fetchData();
  }, [selected]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    switch (selected) {
      case 'topups':
        let data = state.topups.filter(obj => {
          return (
            formateDateOnly(obj.createdAt) >= fromDate &&
            formateDateOnly(obj.createdAt) <= toDate
          );
        });
        console.log(`data here `, data);
        setData(data);
        break;
      case 'users':
        break;
      case 'movies':
        break;
      case 'rentals':
        break;
      case 'payments':
        break;

      default:
        break;
    }
  };

  const dateChanges = (date1, date2) => {
    // console.log(date1.getTime());
    setFromDate(formateDateOnly(date1));
    setToDate(formateDateOnly(date2));
  };

  return (
    <>
      <AdminLayout title="VHS Movies | Reports">
        <h2 className="page-heading">Reporting</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-12">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Select Report Details
                </Dropdown.Toggle>

                <Dropdown.Menu style="">
                  <Dropdown.Item
                    as="button"
                    onClick={() => setSelected('topups')}
                  >
                    Topups
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => setSelected('users')}
                  >
                    Users
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => setSelected('movies')}
                  >
                    Movies
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => setSelected('rentals')}
                  >
                    Rentals
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onClick={() => setSelected('payments')}
                  >
                    Payments
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {selected && (
            <div className="row justify-content-center mt-5">
              <div className="col-md-6 col-sm-12">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Col md={7} sm={10}>
                      <RangePicker
                        onDateSelected={dateChanges}
                        placeholderText="Select date range"
                      />
                    </Col>
                    <Col md={3} sm={2}>
                      <Button type="submit">Search</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          )}
          <div className="row justify-content-center mt-5">
            {selected &&
              selected === 'topups' &&
              state.topups &&
              state.topups.length > 0 && <TopUpReports data={data} />}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Report;
