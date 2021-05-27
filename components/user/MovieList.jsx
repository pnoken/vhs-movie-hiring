//Modules and other imports
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../styles/user/movielist.module.css';
import { Store } from '../../contextStore';
import { GET } from '../../utils/request';
import { Admin } from '../../utils/apiEndpoint';
// import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const MovieList = () => {
  const { dispatch } = useContext(Store);
  const [movies, setMovies] = useState([]);
  const [noMovies, setNomovies] = useState('');
  const [load, setLoading] = useState(true);

  //Fetch movies from server
  useEffect(() => {
    setLoading(true);

    const getMovies = async () => {
      const resp = await GET(Admin.adminMovies);
      console.log('movies ', JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNomovies('No movies Available')
          : setMovies(resp.data);

        setLoading(false);
      }
    };
    getMovies();
  }, []);

  // Add movies to cart
  const AddItemToCart = () => {
    window.localStorage.setItem('cart', JSON.stringify(movies));
    alert('Item added to cart successfully');

    dispatch({
      type: 'SET_CART',
      payload: movies,
    });
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.main}>
          <h3>NEW RELEASES</h3>
          {/*movies container*/}
          <div className={styles.movieContainer}>
            {movies.map(movies => {
              return (
                <div className={styles.movieTile} key={movies.id}>
                  <div className={styles.moviePoster}>
                    <img src={movies.image_url} alt="Movie Poster" />
                  </div>

                  <div className={styles.movieInfo}>
                    <h5>{movies.name}</h5>
                    <button onClick={AddItemToCart}>+</button>
                  </div>
                  <br />
                  <div className={styles.moviesubInfo}>
                    <div>Rating: {movies.rating}/10</div>
                    <div>GH₵{movies.price}.00</div>
                    <div>Quantity: {movies.available}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
