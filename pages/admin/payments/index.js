import { useContext, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/Layout';
import { Store } from '../../../contextStore';
import { Admin } from '../../../utils/apiEndpoint';
import { GET } from '../../../utils/request';
import { getPageCount, perPage, STORETYPES } from '../../../utils/shared';
import Pagination from '../../../components/admin/Pagination';
import Loading from '../../../components/admin/Loading';
import {
  paymentColumns,
  paymentRows,
} from '../../../components/admin/payments/functions';

const Payment = () => {
  const [load, setLoading] = useState(false);
  const [noHistory, setNoHistory] = useState('');

  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      const resp = await GET(Admin.adminPayments);
      console.log('user ' + JSON.stringify(resp.data.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNoHistory('No history Available')
          : dispatch({ type: STORETYPES.PAYMENTS, payload: resp.data.data });
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // ##################################Pagination#########################################
  const [currentHistory, setCurrentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(state.payments);

  useEffect(() => {
    if (state.payments.length > 0) {
      setNoHistory('');
      // setLoading(false);
    } else {
      setNoHistory('No history Available');
      // setLoading(false);
    }
    setCurrentHistory(state.payments.slice(offset, offset + perPage));
  }, [offset, state.payments]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  // ##################################Pagination#########################################

  return (
    <>
      <AdminLayout title="VHS Movies | Payment History">
        <h2 className="page-heading">Paymemts History</h2>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8 col-sm-12">
              <div className="table-responsive ">
                {noHistory && <h4 className="mt-5 text-center">{noHistory}</h4>}

                {state.payments.length > 0 && (
                  <>
                    {/* {JSON.stringify(currentHistory)} */}
                    <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                      <thead>{paymentColumns()}</thead>
                      <tbody>{paymentRows(currentHistory)}</tbody>
                    </table>
                    <Pagination
                      pageCount={pageCount}
                      handlePageChange={handlePageChange}
                      currentPage={setCurrentPage}
                    />
                  </>
                )}
              </div>
              {load && <Loading />}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Payment;
