import { formatCurrency, formatDateTime } from '../../../utils/shared';

export const paymentColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th scope="col">No.</th>
      <th>Date</th>
      <th>Username</th>
      <th>No. of Movies</th>
      <th>Total Cost</th>
      <th>Status</th>
    </tr>
  );
};

export const paymentRows = payments => {
  return payments.map((payment, index) => {
    return (
      <tr key={index}>
        <td style={{ width: '7px' }}>{index + 1}</td>

        <td>{formatDateTime(payment.createdAt)}</td>
        <td>{payment.user.username}</td>
        <td>{payment.order.movies.length}</td>
        <td> {formatCurrency(payment.order.total_cost)}</td>

        <td>PAID</td>
      </tr>
    );
  });
};
