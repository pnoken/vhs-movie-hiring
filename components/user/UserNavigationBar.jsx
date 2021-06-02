// Modules and other imports
import { useEffect, useState } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';

const UserNavbar = ({ setIsLoggedIn }) => {
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

  //Sign Out functionalty
  const SignOutUser = async () => {
    localStorage.removeItem('user-data');
  };
  // useEffect(() => {
  //   localStorage.clear('user-data');
  //   console.log('User is logged out');
  // }, []);

  {
    /*Return statement for navigationbar when user is logged in*/
  }

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
              <a>Cart</a>
            </Link>
            <Link href="#logout">
              <a
                onClick={() => {
                  window.localStorage.removeItem('user-data');
                  setIsLoggedIn(false);
                }}
              >
                Sign out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/*Return statement for navigationbar when user is logged in*/

export default UserNavbar;
