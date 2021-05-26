import styles from '../../styles/user/cart.module.css';
import React, { useState, useEffect, useContext } from 'react';
//import { Store } from '../../contextStore';

const CartItems = () => {
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState([]);
  //const [cart, setCart] = useState(0);
  //const { state } = useContext(Store);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let cartItem = window.localStorage.getItem('cart');
      let userData = window.localStorage.getItem('cart');
      setCartItem(JSON.parse(cartItem));
      setUser(JSON.parse(userData));
    }
    //console.log(state.cart);
  });

  // const removeCartItem = id => {
  //   // let cart = state.cart;
  //   let remove = cartItem.splice(
  //     cartItem.findIndex(item => item.id !== id),
  //     1,
  //   );
  //   if (remove) {
  //     window.localStorage.setItem('cart', JSON.stringify(remove));

  //     setCartItem(cart);
  //   }
  // };

  const checkOut = async e => {
    e.preventDefault();
    let creditBalance = 200;
    if (creditBalance < totalPrice) {
      alert('Balance is not enough for purchase');
    } else {
      var myHeaders = new Headers();
      myHeaders.append('x_access_token', user.token);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        movieId: cartItem.id,
        userId: user.id,
        title: cartItem.title,
        cartId: cartItem.id,
        amount: cartItem.price,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };
      await fetch(
        'https://vhs-backend-v2.herokuapp.com/api/insertorders',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          alert('Successfully placed order');
          //setSuccess(result);
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
                              cartitem.image
                                ? cartitem.image
                                : '/assets/images/movieplaceholder.jpg'
                            }
                            alt="movie with no title"
                            width="180px"
                            height="130px"
                          />
                        </span>
                        <span
                          className={styles.delCart}
                          //onClick={removeCartItem(cartitem.id)}
                        >
                          <img
                            src="/assets/images/delete.svg"
                            alt="delete"
                            height="25px"
                          />
                        </span>
                      </div>
                      <span>
                        <div className={styles.movieTitle}>
                          {cartitem.title}
                        </div>
                      </span>

                      <span className={styles.price}>GHS {cartitem.price}</span>
                      <hr className={styles.linebreak} />
                    </li>
                  ))
                ) : (
                  <div className="text-uppercase">Your cart is empty</div>
                )}
                <span className={styles.subtotal}>SUBTOTAL: </span>
                <span className={styles.price}>
                  GHC {totalPrice.toFixed(2)}
                </span>
              </ul>
              {user.token && cartItem ? (
                <button className={styles.checkout} type="submit">
                  <p className={styles.checkoutText}>CHECKOUT</p>
                </button>
              ) : (user.token && !cartItem) || (!user.token && !cartItem) ? (
                ''
              ) : (
                <button className={styles.login} type="submit">
                  <a className={styles.checkoutText} href="/login">
                    LOGIN
                  </a>
                </button>
              )}

              <br />

              <div>
                Dont' have enough funds? <a href="/topup">TOP UP</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartItems;