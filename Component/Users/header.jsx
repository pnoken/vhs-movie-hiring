import React from "react";
// import classNames from "classnames/bind";
import styles from "../../styles/users/header.module.css";

const HeaderElement = ({ quantity, addToCart }) => {
  //defines styles for header
  const { body, upperDashboardSection, menu, items, circle } = styles;

  const Ccircle = quantity => {
    return <span className={circle}>{quantity}</span>;
  };

  return (
    <div>
      <div className={body}>
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
      </div>
    </div>
  );
};

export default HeaderElement;
