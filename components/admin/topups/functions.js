import { formatCurrency } from '../../../utils/shared';

const topupColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th scope="col">No.</th>
      <th>Date</th>
      <th>Username</th>
      <th>Method</th>
      <th>Amount</th>
      <th>Old Balance</th>
      <th>New Balance</th>
      {/* <th colSpan="2"></th> */}
    </tr>
  );
};

const historyRows = histories => {
  return histories.map((history, index) => {
    return (
      <tr key={index}>
        <td style={{ width: '7px' }}>{index + 1}</td>
        <td>{new Date().toISOString().split('T')[0]}</td>
        <td>{history.user.username}</td>
        <td>{history.payment_method}</td>
        <td>{formatCurrency(history.amount)} </td>
        <td>{formatCurrency(history.user.credit_balance)} </td>
        <td>{formatCurrency(history.new_balance)} </td>
      </tr>
    );
  });
};

export { topupColumns, historyRows };
