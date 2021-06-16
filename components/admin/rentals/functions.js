import { formatCurrency, formatDateTime } from '../../../utils/shared';
import DetailsButton from '../buttons/DetailsButton';

const rentalsColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th scope="col">No.</th>
      <th>Date</th>
      <th>Username</th>
      <th>N0. of Movies</th>
      <th>Date Returned</th>
      <th>Total Cost</th>
      <th></th>
    </tr>
  );
};

const rentalsRows = (rentals, action) => {
  return rentals.map((rental, index) => {
    return (
      <tr key={index}>
        <td style={{ width: '7px' }}>{index + 1}</td>
        <td>{formatDateTime(rental.createdAt)}</td>
        <td>{rental.user.username}</td>
        <td style={{ width: '30px' }}>{rental.movies.length}</td>
        <td></td>
        <td>{formatCurrency(rental.total_cost)}</td>
        <td style={{ width: '100px', textAlign: 'center' }}>
          <DetailsButton action={action} dataObj={rental} />
        </td>
      </tr>
    );
  });
};

export { rentalsColumns, rentalsRows };
