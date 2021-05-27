import { useContext, useEffect, useState } from 'react';
import NewButton from '../../../components/admin/buttons/NewButton';
import AdminLayout from '../../../components/admin/Layout';
import Loading from '../../../components/admin/Loading';
import ConfirmModal from '../../../components/admin/modals/ConfirmModal';
import NewModal from '../../../components/admin/modals/NewModal';
import Pagination from '../../../components/admin/Pagination';
import {
  userColumns,
  userRows,
} from '../../../components/admin/users/functions';
import { Store } from '../../../contextStore';
import { ModalCtx } from '../../../contextStore/modalCtx';
import { Admin } from '../../../utils/apiEndpoint';
import { GET } from '../../../utils/request';
import { getPageCount, perPage, STORETYPES } from '../../../utils/shared';

const User = () => {
  const [load, setLoading] = useState(false);
  const modalValues = useContext(ModalCtx);
  const { state: userState, dispatch } = useContext(Store);

  const [selectedUser, setSelectedUser] = useState({});
  const [noUsers, setNoUsers] = useState('');

  const createNewUser = () => {
    modalValues.setCreate(true);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const resp = await GET(Admin.adminUsers);
      console.log('user ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNoUsers('No users Available')
          : dispatch({ type: STORETYPES.USERS, payload: resp.data });
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ##################################Pagination#########################################
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(userState.users);

  useEffect(() => {
    if (userState.users.length > 0) {
      setNoUsers('');
      // setLoading(false);
    } else {
      setNoUsers('No users Available');
      // setLoading(false);
    }
    setCurrentUsers(userState.users.slice(offset, offset + perPage));
  }, [offset, userState.users]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  // ##################################Pagination#########################################

  const editUser = user => {
    setSelectedUser(user);
    modalValues.setCreate(true);
  };
  const deleteUser = user => {
    console.log('about to delete a user ');
    setSelectedUser(user);
    modalValues.setConfirm(true);
  };

  return (
    <>
      {modalValues.create && (
        <NewModal
          src="user"
          selected={selectedUser}
          setSelected={setSelectedUser}
        />
      )}
      {modalValues.confirm && (
        <ConfirmModal
          src="user"
          selected={selectedUser}
          setSelected={setSelectedUser}
        />
      )}
      <AdminLayout title="VHS Movies | Users">
        <h2 className="page-heading">Users</h2>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              <div className="table-responsive ">
                <NewButton
                  text="New User"
                  id="createUser"
                  action={createNewUser}
                />
                <br />

                {noUsers && <h4 className="mt-5 text-center">{noUsers}</h4>}
                {userState.users.length > 0 && (
                  <>
                    <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                      <thead>{userColumns()}</thead>
                      <tbody>
                        {userRows(currentUsers, editUser, deleteUser)}
                      </tbody>
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

export default User;
