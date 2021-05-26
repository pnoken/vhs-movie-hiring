import { useState, useEffect, useContext } from 'react';

import AdminLayout from '../../../components/admin/Layout';
import {
  movieColumns,
  movieRows,
} from '../../../components/admin/movies/functions';

import NewButton from '../../../components/admin/buttons/NewButton';
import { perPage, getPageCount, STORETYPES } from '../../../utils/shared';
import Pagination from '../../../components/admin/Pagination';
import { ModalCtx } from '../../../contextStore/modalCtx';
import NewModal from '../../../components/admin/modals/NewModal';
import ConfirmModal from '../../../components/admin/modals/ConfirmModal';
import { GET } from '../../../utils/request';
import { Movies } from '../../../utils/apiEndpoint';
import Loading from '../../../components/admin/Loading';
import { Store } from '../../../contextStore';

const Movie = () => {
  const modalValues = useContext(ModalCtx);
  const { state: movieState, dispatch } = useContext(Store);

  const [selectedMovie, setSelectedMovie] = useState({});
  const [noMovies, setNomovies] = useState('');
  const [load, setLoading] = useState(true);

  const createNewMovie = () => {
    modalValues.setCreate(true);
  };

  const editMovie = movie => {
    setSelectedMovie(movie);
    modalValues.setCreate(true);
  };

  const deleteMovie = async movie => {
    console.log('deleting....');

    setSelectedMovie(movie);
    modalValues.setConfirm(true);
  };

  useEffect(() => {
    setLoading(true);

    const getMovies = async () => {
      const resp = await GET(Movies.adminMovies);
      console.log('movies ', JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNomovies('No movies Available')
          : dispatch({ type: STORETYPES.MOVIES, payload: resp.data }); //setMovies(resp.data);

        setLoading(false);
      }
    };
    getMovies();
  }, []);

  // useEffect(() => {
  //   if (movieState.movies.length > 0) setNomovies('');
  // }, [movieState.movies]);

  // ##################################Pagination#########################################
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * perPage;
  const pageCount = getPageCount(movieState.movies);

  useEffect(() => {
    if (movieState.movies.length > 0) {
      setNomovies('');
      // setLoading(false);
    } else {
      setNomovies('No movies Available');
      // setLoading(false);
    }
    setCurrentMovies(movieState.movies.slice(offset, offset + perPage));
  }, [offset, movieState.movies]);

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
      {modalValues.confirm && (
        <ConfirmModal
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

                {noMovies && <h4 className="mt-5 text-center">{noMovies}</h4>}
                {movieState.movies.length > 0 && (
                  <>
                    <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                      <thead>{movieColumns()}</thead>
                      <tbody>
                        {movieRows(currentMovies, editMovie, deleteMovie)}
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

export default Movie;
