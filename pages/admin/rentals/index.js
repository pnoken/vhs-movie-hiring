import { useContext, useEffect, useState } from 'react';
import NewButton from '../../../components/admin/buttons/NewButton';
import AdminLayout from '../../../components/admin/Layout';
import Loading from '../../../components/admin/Loading';
import RentalDetails from '../../../components/admin/modals/RentalsDetails';
import Pagination from '../../../components/admin/Pagination';
import {
  rentalsColumns,
  rentalsRows,
} from '../../../components/admin/rentals/functions';
import { Store } from '../../../contextStore';
import { ModalCtx } from '../../../contextStore/modalCtx';
import { Admin } from '../../../utils/apiEndpoint';
import { GET } from '../../../utils/request';
import { getPageCount, perPage, STORETYPES } from '../../../utils/shared';
import NewModal from '../../../components/admin/modals/NewModal';

const Rental = () => {
  const [load, setLoading] = useState(false);
  const [noRental, setNoRental] = useState('');
  const [selectedRental, setSelectedRental] = useState({});

  const { state: rentalState, dispatch } = useContext(Store);
  const modalValues = useContext(ModalCtx);

  useEffect(() => {
    setLoading(true);
    const fetchRentals = async () => {
      const resp = await GET(Admin.adminRentals);
      console.log('rentals ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNoRental('No rentals Available')
          : dispatch({ type: STORETYPES.RENTALS, payload: resp.data });
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  // ##################################Pagination#########################################
  const [currentRentals, setCurrentRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(rentalState.rentals);

  useEffect(() => {
    if (rentalState.rentals.length > 0) {
      setNoRental('');
      // setLoading(false);
    } else {
      setNoRental('No history Available');
      // setLoading(false);
    }
    setCurrentRentals(rentalState.rentals.slice(offset, offset + perPage));
  }, [offset, rentalState.rentals]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  // ##################################Pagination#########################################

  const rentMovieOut = () => {
    modalValues.setCreate(true);
    console.log('clicked');
  };

  const getDetails = selected => {
    setSelectedRental(selected);
    modalValues.setDetails(true);
  };

  return (
    <>
      {modalValues.create && <NewModal src="rental" />}

      {modalValues.details && (
        <RentalDetails
          selected={selectedRental}
          setSelected={setSelectedRental}
        />
      )}

      <AdminLayout title="VHS Movies | Rentals">
        <h2 className="page-heading">Rentals</h2>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8 col-sm-12">
              <div className="table-responsive ">
                <NewButton
                  text="Rent out Movie"
                  id="rentMovie"
                  action={rentMovieOut}
                />
                <br />
                {noRental && <h4 className="mt-5 text-center">{noRental}</h4>}
                {rentalState.rentals.length > 0 && (
                  <>
                    <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                      <thead>{rentalsColumns()}</thead>
                      <tbody>{rentalsRows(currentRentals, getDetails)}</tbody>
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

export default Rental;
