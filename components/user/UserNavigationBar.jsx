// Modules and other imports
import { useState, useContext } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';
import { Store } from '../../contextStore';

const UserNavbar = ({ setIsLoggedIn }) => {
  const { state } = useContext(Store);
  const [user, setUser] = useState([]);
  //const [cartItem, setCartItem] = useState([]);
  //Quantity of items in cart
  const cartItems = () => {
    if (typeof window == 'undefined') {
      //let cartItem = window.localStorage.getItem('cart');
      let userData = window.localStorage.getItem('user-data');
      //setCartItem(JSON.parse(cartItem));
      setUser(JSON.parse(userData));
      console.log('No items in cart');
    }
  };

  // const cartCircle = () => {
  //   return <span className={styles.cartCirc}>{cartItem.length}</span>;
  // };

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
              <a>Cart {state.cart.length}</a>
            </Link>
            {user.role === 'admin' ? (
              <Link href="/admin/dashboard">
                <a>Admin Dashboard</a>
              </Link>
            ) : (
              ''
            )}
            <Link href="#signout">
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
