//Modules and other imports
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../styles/user/movielist.module.css';
import { Store } from '../../contextStore';
// import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const MovieList = () => {
  const { dispatch } = useContext(Store);
  const [movies, setMovies] = useState([]);

  //Fetch movies from server
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios
        .get('https://vhs-backend-v2.herokuapp.com/api/getmovies', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then(response => {
          if (response.status == 200) {
            console.log('Movies Fetched successfully from server', response);
            setMovies(response.data);
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          console.log('There seems to be an issue contacting the server', err);
        });
    };
    fetchMovies();
  }, []);

  // Add movies to cart
  const AddItemToCart = () => {
    window.localStorage.setItem('cart', JSON.stringify(movies));

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
                    <img
                      src="/img/sample-movie-poster-joker.jpg"
                      alt="Movie Poster"
                    />
                  </div>

                  <div className={styles.movieInfo}>
                    <h5>{movies.title}</h5>
                    <button onClick={AddItemToCart}>+</button>
                  </div>
                  <br />
                  <div className={styles.moviesubInfo}>
                    <div>{movies.rating}</div>
                    <div>GH₵{movies.price}.00</div>
                    <div>Quantity: {movies.availabilty}</div>
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
