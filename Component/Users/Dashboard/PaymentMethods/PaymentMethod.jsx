import React, { useEffect, useState } from 'react';
import Head from "next/head";
import HeaderElement from '../../header';
//import FooterElement from '../footer'
import axios from 'axios'
import styles from "../../../../styles/users/paymentmethods.module.css";

const VHSPaymentMethod = () => {
  const {
    body,
    upperDashboardSection,
    circle
  } = styles;

  //fetch Movies
  const [movies, setMovies] = useState([]);

  const url = `https://hiring-vhs.herokuapp.com/movies`;

  //Fetch client list

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios
        .get(`https://hiring-vhs.herokuapp.com/movies`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(response => {
          if (response.status == 200) {
            console.log(
              "Movies fetched from database successfully",
              response.data
            );
            localStorage.setItem("All Movies", response.data);
            setMovies(response.data);
          } else {
            console.log(response.data);
          }
        })
        .catch(err => {
          console.log("There seems to be an issue fetching data", err);
        });
    };
    fetchMovies();
  }, []);

  // MOVIE PRICE
  let defaultMoviePrice = 20;
  const [MoviePrice, setMoviePrice] = useState(defaultMoviePrice);

  // QUANTITY
  const [quantity, setQuantity] = useState(1);

  // DISCOUNT
  let dafaultDiscount = 5;
  // let defaultCouponDiscount = quantity * dafaultDiscount ;
  const [couponDiscount, setCouponDiscount] = useState(dafaultDiscount);
  console.log(couponDiscount);

  // TOTAL PRICE
  // let defaultTotalPrice = MoviePrice * quantity - couponDiscount ;
  // console.log(defaultTotalPrice);
  const [totalPrice, setTotalPrice] = useState(MoviePrice);

  const [addToCart, setAddToCart] = useState(false);
  console.log(`Add to cart button click ? ${addToCart}`);

  const Ccircle = quantity => {
    return <span className={circle}>{quantity}</span>;
  };

  //incrementing and decrementing item number to be added to cart
  function incrementQuentaty() {
    setQuantity(prevQuantity => prevQuantity + 1);
    setTotalPrice(prevPrice => prevPrice + MoviePrice);
  }

  function decrementQuantity() {
    setQuantity(prevQuantity => prevQuantity - 1);
    setTotalPrice(prevPrice => prevPrice - MoviePrice);
  }

  //coupon function --- may come in handy when we decide to go by
  function usingCouponDiscount(e) {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == 123) {
      console.log("set total price and coupon discount");
      setCouponDiscount(prevDiscount => prevDiscount);
      setTotalPrice(prevPrice => prevPrice - couponDiscount * quantity);
    }
  }

  function handleClick(e, id) {
    e.preventDefault();
    id
    setAddToCart(prevAddToCart => (prevAddToCart = true));
  }

  return (
    <div>

      <Head>
        <title>VHS Movie Hiring | Payment Methods</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className={body}>
        <div className={upperDashboardSection}>
          <HeaderElement quantity={ quantity} addToCart={ addToCart} />
        </div>
      </div>

<hr style={{marginBottom:"10px"}}/>

    </div>
  );
};

export default VHSPaymentMethod;

