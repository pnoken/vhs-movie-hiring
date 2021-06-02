import styles from '../../styles/user/cart.module.css';
import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../contextStore';
import { useRouter } from 'next/router';
import Loading from './Loading';

const CartItems = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState([]);
  const [load, setLoading] = useState(false);
  //const [creditBalance, setCreditBalance] = useState(user.user.credit_balance);
  //const { state } = useContext(Store);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      let cartItem = window.localStorage.getItem('cart');
      let userData = window.localStorage.getItem('user-data');
      setCartItem(JSON.parse(cartItem));
      setUser(JSON.parse(userData));
      setLoading(false);
    }
    console.log('cart state', cartItem);
  }, []);

  const removeCartItem = id => {
    //let cart = state.cart;
    let remove = cartItem.filter(item => item._id !== id);
    if (remove) {
      window.localStorage.setItem('cart', JSON.stringify([...remove]));
      setCartItem([...remove]);
    }
  };

  const checkOut = async e => {
    e.preventDefault();
    let creditBalance = user.user.credit_balance;
    if (creditBalance < totalPrice) {
      alert('Balance is not enough for purchase');
    } else {
      var myHeaders = new Headers();
      myHeaders.append('auth-token', user.token);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        movies: cartItem,
        total_cost: totalPrice,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
      await fetch(
        'https://vhs-project-backend.herokuapp.com/user/order',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          alert('Successfully placed order', result);
          window.localStorage.removeItem('cart');
          router.push('/');
        })
        .catch(error => console.log('error', error));
    }
  };

  const totalPrice = (cartItem ? cartItem : []).reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  // const loginInfo = () => {

  // }

  return (
    <form className="needs-validation" novalidate="" onSubmit={checkOut}>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={`${styles.cartItems} d-flex justify-content-center`}>
            <div className="">
              <div>
                <span>
                  <img src="/assets/images/cart.svg" />
                </span>
                <span className={styles.ellipse}>
                  <img src="/assets/images/ellipse.svg" />
                  <span className={styles.cartnum}>
                    {cartItem ? cartItem.length : 0}
                  </span>
                </span>
                <span>Cart</span>
              </div>
              <hr className={styles.linebreak} />
              <ul style={{ listStyle: 'none' }}>
                {cartItem && cartItem.length > 0 ? (
                  cartItem.map(cartitem => (
                    <li>
                      <div>
                        <span>
                          <img
                            src={
                              cartitem.image_url
                                ? cartitem.image_url
                                : '/assets/images/movieplaceholder.jpg'
                            }
                            alt="movie with no title"
                            width="180px"
                            height="130px"
                          />
                        </span>
                        <span
                          className={styles.delCart}
                          onClick={() => removeCartItem(cartitem._id)}
                        >
                          <img
                            src="/assets/images/delete.svg"
                            alt="delete"
                            height="25px"
                          />
                        </span>
                      </div>
                      <span>
                        <div className={styles.movieTitle}>{cartitem.name}</div>
                      </span>

                      <span className={styles.price}>GHS {cartitem.price}</span>
                      <hr className={styles.linebreak} />
                    </li>
                  ))
                ) : (
                  <div className="text-uppercase">Your cart is empty</div>
                )}
              </ul>
              {user && cartItem.length > 0 ? (
                <div>
                  <span className={styles.subtotal}>SUBTOTAL: </span>
                  <span className={styles.price}>
                    GHC {totalPrice.toFixed(2)}
                  </span>
                  <button className={styles.checkout} type="submit">
                    <p className={styles.checkoutText}>CHECKOUT</p>
                  </button>
                </div>
              ) : !user && cartItem.length > 0 ? (
                <div>
                  <span className={styles.subtotal}>SUBTOTAL: </span>
                  <span className={styles.price}>
                    GHC {totalPrice.toFixed(2)}
                  </span>
                  <button className={styles.login} type="submit">
                    <a className={styles.checkoutText} href="/login">
                      LOGIN
                    </a>
                  </button>
                </div>
              ) : (
                ''
              )}

              <br />

              <div>
                Dont' have enough funds? <a href="/topup">TOP UP</a>
              </div>
            </div>
          </div>
          {load && <Loading />}
        </div>
      </div>
    </form>
  );
};

export default CartItems;
