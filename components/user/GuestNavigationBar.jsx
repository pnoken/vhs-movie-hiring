// Modules and other imports
import { Store } from '../../contextStore';
import { useState, useContext, useEffect } from 'react';

import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';

const GuestNavbar = () => {

  //state objects
  const { state } = useContext(Store);


  //Quantity of items in cart
  const cartItems = () => {
    window.localStorage.getItem('cart').length;
    if (typeof window == 'undefined') {
      console.log('No items in cart');
    }
  };

  const cartCircle = () => {
    return <span className={styles.cartCirc}>{cartItems}</span>;
  };
  /*Return statement for navigationbar when user is not logged in*/

  return (
    <div>
      <div>
        {/* navigationbar elements */}
        <div className={styles.navigationbar}>
          <Link href="/">
            <a className={styles.logo}>
              <img src="img/logo.png" alt="home logo" />
            </a>
          </Link>
          <div className={styles.navigationlinks}>
          <Link href="/cart">
              <a>Cart {" "}
                  <span style={{backgroundColor: "white", color: "rgb(93, 95, 97)", borderRadius: "50px", width: "15px", padding: "0px 5px 0px 5px"}}>
                    {state.cart.length}
                  </span>
                </a>
            </Link>
            <Link href="/login">
              <a>Sign in</a>
            </Link>
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuestNavbar;
