// Modules and other imports
import { useEffect, useState } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  const [loggedInNavBar, setLoggedInNavBar] = useState({});
  const [NavigationBar, setNavigationBar] = useState({});

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
  const SignOutUser = () =>
    useEffect(() => {
      localStorage.clear('user-data');
      console.log('User is logged out');
    }, []);

  //check login status
  useEffect(() => {
    const user_Logged_in = localStorage.getItem('user-data');

    if (user_Logged_in) {
      const userFound = JSON.parse(user_Logged_in);
      console.log('user is logged in');

      {
        /*Return statement for navigationbar when user is logged in*/
      }
      return (
        <div>
          {/* navigationbar elements */}
          <div className={styles.navigationbar}>
            <div className={styles.logo}>
              <img src="img/logo.png" alt="logo" />
            </div>
            <div className={styles.navigationlinks}>
              <Link href="/">
                <a> Home</a>
              </Link>
              <Link href="cart">
                <a>Cart</a>
              </Link>
              <Link href="/" onclick={SignOutUser}>
                <a>Sign out</a>
              </Link>
            </div>
          </div>
        </div>
      );
    } else console.log('User session expired. Kindly do login');
  }, []);

  {
    /*Return statement for navigationbar when user is logged in*/
  }
  return (
    <div>
      {/* navigationbar elements */}
      <div className={styles.navigationbar}>
        <div className={styles.logo}>
          <img src="img/logo.png" alt="logo" />
        </div>
        <div className={styles.navigationlinks}>
          <Link href="/">
            <a> Home</a>
          </Link>
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
  );
};

export default Navbar;
