// Modules and other imports
import { useState, useContext, useEffect } from 'react';
import styles from '../../styles/user/navbar.module.css';
import Link from 'next/link';
import { Store } from '../../contextStore';
import { FaUserCircle, FaUserEdit, FaHistory } from 'react-icons/fa';



const UserNavbar = ({ setIsLoggedIn }) => {

  const { state } = useContext(Store);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  
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

    //Dropdown navigation items

    function Dropdownnav(props){
      return(
        <nav className="navbar">
          <ul className="navbar-nav">{props.children}</ul>
        </nav>
      )
    }

    function NavItem(props) {
      return(
        <li className="nav-item">
          <a href="#" className="icon-button" onClick={()=>setShow(!show)}>
            {props.icon}
          </a>
          {show && props.children}
        </li>

      )
    }

    function DropdownMenu (){
      function DropdownItem(props){
        return(
          <a href="#" className="menu-item">
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        )
      }
      return(
        <div className="dropwdown">
          <DropdownItem leftIcon={<FaUserEdit/>}><a href="/user/profile">My Profile</a></DropdownItem>
          <DropdownItem leftIcon={<FaHistory/>}><a href="/user/rentalhistory">Rentals</a></DropdownItem>
        </div>
      )
    }
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

            <Link href="/cart">
              <a>Cart {" "}
                  <span style={{backgroundColor: "white", color: "rgb(93, 95, 97)", borderRadius: "50px", width: "15px", padding: "0px 5px 0px 5px"}}>
                    {state.cart.length}
                  </span>
                </a>
            </Link>
            
            <Link href="/">
              <a
                onClick={() => {
                  window.localStorage.removeItem('user-data');
                  setIsLoggedIn(false);
                }}
              >
                Sign out
              </a>
            </Link>
            <Link href="/topup">
              <a>Balance {" "}
                  <span style={{backgroundColor: "white", color: "rgb(93, 95, 97)", borderRadius: "50px", width: "15px", padding: "0px 5px 0px 5px"}}>
                    {credit_balance}
                  </span>
                </a>
            </Link>

            <div className={styles.userDropdown}>

                {/* <div className={styles.dropdown}>
									<FaUserCircle size={20} />
								</div>
                <div className={styles.dropdownItems}>
                  <a href="#">Profile</a>
                  <a href="">Activity History</a>
                </div> */}

              <div>
                

                <NavItem icon={<FaUserCircle size={20} />}>
                  <DropdownMenu/>
                </NavItem>

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
