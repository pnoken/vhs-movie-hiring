//Modules and other imports
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../../styles/user/movielist.module.css';
import { Store } from '../../../contextStore';
import { GET } from '../../../utils/request';
import { User } from '../../../utils/apiEndpoint';
import Loading from '.././Loading';
import notify from '../../../utils/toast';
import { perPage, getPageCount, STORETYPES } from '../../../utils/shared';
// import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Rentals = () => {
  const { state, dispatch } = useContext(Store);
  const [movies, setMovies] = useState([]);
  const [noMovies, setNomovies] = useState('');
  const [load, setLoading] = useState(false);
  const [cart, setCart] = useState();

  //Fetch movies from server
  useEffect(() => {
    setLoading(true);

    const getRentals = async () => {
      const resp = await GET(User.order);
      // console.log('movies ', JSON.stringify(resp.data));
      if (resp && resp.data) {
        resp.data.length <= 0
          ? setNomovies('No movies Available')
          : setMovies(resp.data);

        setLoading(false);
      }
    };
    getRentals();
  }, []);

  // Add movies to cart
  const addItemToCart = async id => {
    const found = state.cart.find(movie => movie.movie_id === id);
    if (found) {
      notify().error('item already in cart');
      return;
    }
    try {
      const result = movies.filter(movie => movie._id === id);
      console.log('result', result[0].price);
      if (result) {
        console.log('res', result);
        dispatch({
          type: STORETYPES.CART,
          payload: {
            movie_id: result[0]._id,
            name: result[0].name,
            price: result[0].price,
            image_url: result[0].image_url,
            available: result[0].available,
          },
        });
        notify().success('Item added to cart successfully');
      }
    } catch (error) {
      notify().error('failed to add item to cart');
    }
  };

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  });

  return (
    <div>
      <div className={styles.body}>
        {/* <div className={styles.main}> */}
        <h3>NEW RELEASES</h3>
        {noMovies && <h4 className="mt-5 text-center">{noMovies}</h4>}
        {/*movies container*/}

        <div className={styles.movieContainer}>
          {movies.map(movie => {
            return (
              <div className="card" style={{backgroundColor: "rgb(93, 95, 97)", margin: "0px 10px 10px 20px", height: "40%"}} key={movie._id}>
                {movie.available ? (<div className={styles.moviePoster}>
                  <img
                    src={
                      movie.image_url && movie.available
                        ? movie.image_url
                        : 'https://st2.depositphotos.com/1186248/6498/i/600/depositphotos_64982201-stock-photo-out-of-stock.jpg'
                    }
                    alt="Movie Poster"
                  />
                  </div>) : (<div className={styles.moviePoster} style={{opacity:"0.4"}}>
                    <img
                      src={
                        movie.image_url && movie.available
                          ? movie.image_url
                          : 'https://st2.depositphotos.com/1186248/6498/i/600/depositphotos_64982201-stock-photo-out-of-stock.jpg'
                      }
                      alt="Movie Poster"
                    /> 
                    </div>)}
          
                    
                <div className={styles.movieInfo}>
                  <h5>{movie.name}</h5>
                  {movie.available ? (
                    <button onClick={() => addItemToCart(movie._id)}>+</button>
                  ) : (
                    <button disabled={true}>
                      X
                    </button>
                  )}
                </div>
                <br />
                <div className={styles.moviesubInfo}>
                  <div>Rating: {movie.rating}/10</div>
                  <div>GH₵{movie.price}.00</div>
                  {movie.available ? (
                    <div>Quantity: {movie.available}</div>
                  ) : (
                    <div>Out of Stock</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {load && <Loading />}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Rentals;
