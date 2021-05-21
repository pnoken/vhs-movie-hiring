import { MdEdit } from 'react-icons/md';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

const movieColumns = () => {
  return (
    <tr
      style={{ background: '#388638', borderRadius: '4px' }}
      className="text-white"
    >
      <th scope="col">NO.</th>
      <th>TITLE.</th>
      <th>GENRE</th>
      <th>COST PER DAY</th>
      <th>QUANTITY</th>
      <th colSpan="2"></th>
    </tr>
  );
};

const movieRows = (movies, action) => {
  return movies.map((movie, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}.</td>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.cost}</td>
        <td>{movie.quantity}</td>
        <td>
          <EditButton action={action} dataObj={movie} />
        </td>
        <td>
          <DeleteButton />
        </td>
      </tr>
    );
  });
};

export { movieRows, movieColumns };
