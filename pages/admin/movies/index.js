import { useState, useEffect, useContext } from 'react';

import AdminLayout from '../../../components/admin/Layout';
import {
  movieColumns,
  movieRows,
} from '../../../components/admin/movies/functions';

import NewButton from '../../../components/admin/buttons/NewButton';
import { perPage, getPageCount } from '../../../utils/shared';
import Pagination from '../../../components/admin/Pagination';
import { ModalCtx } from '../../../contextStore/modalCtx';
import NewModal from '../../../components/admin/modals/NewModal';

const Movie = () => {
  const modalValues = useContext(ModalCtx);
  const [selectedMovie, setSelectedMovie] = useState({});
  const createNewMovie = () => {
    modalValues.setCreate(true);
  };

  const editMovie = movie => {
    setSelectedMovie(movie);
    modalValues.setCreate(true);
  };

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Movie one',
      genre: 'any',
      cost: 20,
      quantity: 20,
      status: true,
    },
    {
      id: 2,
      title: 'Movie two',
      genre: 'two',
      cost: 10,
      quantity: 50,
      status: true,
    },
    {
      id: 3,
      title: 'Movie three',
      genre: 'thre',
      cost: 40,
      quantity: 5.5,
      status: true,
    },
  ]);

  // ##################################Pagination#########################################
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(movies);

  useEffect(() => {
    setCurrentMovies(movies.slice(offset, offset + perPage));
  }, [offset, movies]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  // ##################################Pagination#########################################

  return (
    <>
      {modalValues.create && (
        <NewModal
          src="movie"
          selected={selectedMovie}
          setSelected={setSelectedMovie}
        />
      )}
      <AdminLayout>
        <h2 className="page-heading">All Movies</h2>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              <div className="table-responsive ">
                <NewButton
                  text="New Movie"
                  id="createMovie"
                  action={createNewMovie}
                />
                <br />
                <table className="table table-striped table-hover table-sm mt-4">
                  <thead>{movieColumns()}</thead>
                  <tbody>{movieRows(currentMovies, editMovie)}</tbody>
                </table>
                <Pagination
                  pageCount={pageCount}
                  handlePageChange={handlePageChange}
                  currentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Movie;
