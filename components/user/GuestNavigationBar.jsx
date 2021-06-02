// Modules and other imports
import { useEffect, useState } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';

const GuestNavbar = () => {
  //   useEffect(() => {
  //     const userLoggedIn = window.localStorage.getItem("user-data");

  //     if (userLoggedIn){
  //       let ParsedLoggedIn = JSON.parse(userLoggedIn);
  //       console.log("Parsed Login", ParsedLoggedIn);
  //       setUserprofile(ParsedLoggedIn);
  //       setLoggedInuser(true);
  //     }

  //   }, [userLoggedIn])

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
            <Link href="cart">
              <a>Cart {cartCircle}</a>
            </Link>
            <Link href="login">
              <a>Sign in</a>
            </Link>
            <Link href="signup">
              <a>Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuestNavbar;
