import { formatCurrency, formatDateTime } from '../../../utils/shared';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

const userColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th>No.</th>
      <td>Date</td>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Age</th>
      <th>Wallet Bal</th>
      <th>Role</th>
      <th colSpan="2"></th>
    </tr>
  );
};

const userRows = (users, editAction, deleteAction) => {
  return users.map((user, index) => {
    return (
      <tr key={index}>
        <td style={{ width: '7px' }}>{index + 1}</td>
        <td>{formatDateTime(user.createdAt)}</td>
        <td>{`${user.first_name} ${user.last_name}`}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.age} </td>
        <td>{formatCurrency(user.credit_balance)}</td>
        <td>{user.role}</td>
        <td>
          <EditButton action={editAction} dataObj={user} />
        </td>
        <td>
          <DeleteButton action={deleteAction} dataObj={user} src="user" />
        </td>
      </tr>
    );
  });
};

export { userColumns, userRows };
