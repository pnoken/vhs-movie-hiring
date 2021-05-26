import { formatCurrency } from '../../../utils/shared';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

const movieColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th scope="col">No.</th>
      <th>Thumbnail</th>
      <th>Title</th>
      <th>Year</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Status</th>
      <th colSpan="2"></th>
    </tr>
  );
};

const movieRows = (movies, editAction, deleteAction) => {
  return movies.map((movie, index) => {
    return (
      <tr key={index}>
        <td style={{ width: '7px' }}>{index + 1}</td>
        <td style={{ width: '15px' }} className="text-center">
          <img
            src={movie.image_url}
            alt="Picture of the author"
            width={45}
            height={45}
          />
        </td>
        <td>{movie.name}</td>
        <td>{movie.release_year}</td>
        <td> {formatCurrency(movie.price)}</td>
        <td>{movie.available}</td>
        <td>{movie.available > 0 ? 'Available' : 'Out of stock'}</td>
        <td>
          <EditButton action={editAction} dataObj={movie} />
        </td>
        <td>
          <DeleteButton action={deleteAction} dataObj={movie} src="movie" />
        </td>
      </tr>
    );
  });
};

export { movieRows, movieColumns };
