import { useContext, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/Layout';
import Loading from '../../../components/admin/Loading';
import Pagination from '../../../components/admin/Pagination';
import {
  historyRows,
  topupColumns,
} from '../../../components/admin/topups/functions';
import { Store } from '../../../contextStore';
import { Admin } from '../../../utils/apiEndpoint';
import { GET } from '../../../utils/request';
import { getPageCount, perPage, STORETYPES } from '../../../utils/shared';

const TopupHistory = () => {
  const [load, setLoading] = useState(false);
  const [noHistory, setNoHistory] = useState('');

  const { state: topupState, dispatch } = useContext(Store);

  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      const resp = await GET(Admin.adminTopupHistory);
      console.log('user ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNoUsers('No history Available')
          : dispatch({ type: STORETYPES.TOPUPS, payload: resp.data });
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // ##################################Pagination#########################################
  const [currentHistory, setCurrentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(topupState.topups);

  useEffect(() => {
    if (topupState.topups.length > 0) {
      setNoHistory('');
      // setLoading(false);
    } else {
      setNoHistory('No history Available');
      // setLoading(false);
    }
    setCurrentHistory(topupState.topups.slice(offset, offset + perPage));
  }, [offset, topupState.topups]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  // ##################################Pagination#########################################

  return (
    <AdminLayout title="VHS Movies | Topup History">
      <h2 className="page-heading">Topup History</h2>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
            <div className="table-responsive ">
              {noHistory && <h4 className="mt-5 text-center">{noHistory}</h4>}
              {topupState.topups.length > 0 && (
                <>
                  <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                    <thead>{topupColumns()}</thead>
                    <tbody>{historyRows(currentHistory)}</tbody>
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
  );
};

export default TopupHistory;
