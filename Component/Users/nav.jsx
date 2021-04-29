import React, {useState, useEffect} from "react";
import Link from "next/link";
import {FaCartPlus} from "react-icons/fa"
import {RiLogoutCircleRLine} from "react-icons/ri"
import {GiWallet} from "react-icons/gi" 
import {MdFavorite} from "react-icons/md"
// import classNames from "classnames/bind";
import styles from "../../styles/users/header.module.css";

const NavElement = ({ quantity, addToCart }) => {
  //defines styles for header
  const { body, upperDashboardSection, menus, items, circle, nav, logo, menu_item, } = styles;

    const userLogout = () => {
      localStorage.removeItem('user-credentials');
      console.log("user-session ended");
    }  
  
  const Ccircle = quantity => {
    return <span className={circle}>{quantity}</span>;
  };

  return (
    <div>
      
        {/* Navigation Section */}
        <section className={nav}>

          {/* Logo Section */}
          <div>
            <img src="/img/vhs-logo.png" alt="logo" className={logo}/>

          </div>

          {/* Menu Items */}
          <div>
            <ul className={menus}>
              <Link href="/users">
                <li className={menu_item}>All Movies</li>
              </Link>

              <Link href="/users/dashboard/mymovies">
                <li className={menu_item}>My Movies</li>
              </Link>

              <Link href="/users/dashboard/cart">
                <li className={menu_item}>
                  <FaCartPlus/> Cart {addToCart == true ? Ccircle(quantity) : null}
                </li>
              </Link>

              <Link href="/users/dashboard/wallet">
                <li className={menu_item}>
                  <GiWallet/> Wallet
                </li>
              </Link>

              <Link href="/">
                <li className={menu_item} onClick={userLogout}>
                  <RiLogoutCircleRLine/> Logout
                </li>
              </Link>
            </ul>
          </div>
        </section>


      {/* <div className={body}>
        <div className={upperDashboardSection}>

      <div className={menu}>
        <div className={items}>
          <img src="/img/vhs-logo.png" alt="logo" style={{float: "left", margin: "12px",
                  marginTop: "1%",
                  marginBottom: "5%",
                  float: "center",
                  height: "32px",
                  width: "48px"}}/>

          <ul>
            <li>
              <a href="../../users#">Movies</a>
            </li>
            <li>
              <a href="/users/dashboard/categories#">Categories</a>
            </li>
            <li>
              <a href="/users/dashboard/favorites#">Favorites</a>
            </li>
            <li>
              <a href="/users/dashboard/mymovies#">My Movies (Events)</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/users/dashboard/cart#">
                Cart
                <span>&#128722;</span>
                {addToCart == true ? Ccircle(quantity) : null}
              </a>
            </li>
            <li>
              <a href="/users/dashboard/wallet#">
                {" "}
                Wallet <span>&#128176;</span>
              </a>
            </li>
            <li>
              <a href="/">
                {" "}
                <strong>
                  Logout <span>&#8618;</span>
                </strong>
              </a>
            </li>
          </ul>
        </div>
        </div>
        </div>
      </div> */}
    </div>
  );
};

export default NavElement;
