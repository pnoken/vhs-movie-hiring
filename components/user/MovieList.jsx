//Modules and other imports
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../styles/user/movielist.module.css';
import { Store } from '../../contextStore';
import { GET } from '../../utils/request';
import { Admin } from '../../utils/apiEndpoint';
import Loading from './Loading';
import { perPage, getPageCount, STORETYPES } from '../../utils/shared';
// import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const MovieList = () => {
  const { state, dispatch } = useContext(Store);
  const [movies, setMovies] = useState([]);
  const [noMovies, setNomovies] = useState('');
  const [load, setLoading] = useState(false);
  const [cart, setCart] = useState();

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
  const addItemToCart = async id => {
    const found = state.cart.find(movie => movie._id === id);
    if (found) {
      alert('item already in cart');
      return;
    }
    try {
      const result = movies.filter(movie => movie._id === id);
      console.log('result', result[0].price);
      if (result) {
        dispatch({
          type: STORETYPES.CART,
          payload: {
            _id: result[0]._id,
            name: result[0].name,
            price: result[0].price,
            image_url: result[0].image_url,
          },
        });
        alert('Item added to cart successfully');
      }
    } catch (error) {
      alert('failed to add to cart', error);
    }
  };

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  });

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.main}>
          <h3>NEW RELEASES</h3>
          {noMovies && <h4 className="mt-5 text-center">{noMovies}</h4>}
          {/*movies container*/}
          <div className={styles.movieContainer}>
            {movies.map(movie => {
              return (
                <div className={styles.movieTile} key={movie._id}>
                  <div className={styles.moviePoster}>
                    <img
                      src={
                        movie.image_url
                          ? movie.image_url
                          : '/assets/images/movieplaceholder.jpg'
                      }
                      alt="Movie Poster"
                    />
                  </div>

                  <div className={styles.movieInfo}>
                    <h5>{movie.name}</h5>
                    <button onClick={() => addItemToCart(movie._id)}>+</button>
                  </div>
                  <br />
                  <div className={styles.movieubInfo}>
                    <div>Rating: {movie.rating}/10</div>
                    <div>GH₵{movie.price}.00</div>
                    <div>Quantity: {movie.available}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {load && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
