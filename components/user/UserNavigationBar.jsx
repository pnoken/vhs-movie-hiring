// Modules and other imports
import { useState, useContext, useEffect } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';
import { Store } from '../../contextStore';
import { FaUserCircle } from 'react-icons/fa';


const UserNavbar = ({ setIsLoggedIn }) => {
  const { state } = useContext(Store);
  const [user, setUser] = useState({});
  
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

   //user balance
    const [credit_balance, setBalance] = useState ("0")

    useEffect(()=>{
      const userData = window.localStorage.getItem('user-data');

        if(typeof window == 'undefined' || userData) {
          const foundUser = JSON.parse(userData);
          setBalance(foundUser.user.credit_balance);
          console.log('user balance is', credit_balance)
        }
    }, [])

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
              <a>Cart {" "}
                  <span style={{backgroundColor: "white", color: "rgb(93, 95, 97)", borderRadius: "50px", width: "15px", padding: "0px 5px 0px 5px"}}>
                    {state.cart.length}
                  </span>
                </a>
            </Link>
            
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
            <Link href="topup">
              <a>Balance {" "}
                  <span style={{backgroundColor: "white", color: "rgb(93, 95, 97)", borderRadius: "50px", width: "15px", padding: "0px 5px 0px 5px"}}>
                    {credit_balance}
                  </span>
                </a>
            </Link>
            <div className={styles.userDropdown}>
                <div className={styles.dropdown}>
									<FaUserCircle size={20} />
								</div>
                <div className={styles.dropdownItems}>
                  <a href="#">Profile</a>
                  <a href="">Activity History</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*Return statement for navigationbar when user is logged in*/

export default UserNavbar;
