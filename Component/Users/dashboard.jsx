import React, { useEffect, useState } from 'react';
import Head from "next/head";

import HeaderElement from './header';
import FooterElement from './footer'
import MovieSlideshow from './slideshow'
// import classNames from "classnames/bind";
import axios from 'axios'
import styles from "../../../styles/users/userdashboard.module.css";

const UsersDashboard = () => {
  const {
    body,
    upperDashboardSection,
    menu,
    items,
    ul,
    li,
    a,
    circle,
    box,
    image,
    img,
    detail,
    title,
    desc,
    setquan,
    setbg,
    sQuantity,
    btns,
    btn,
    price,
    coupon,
    input,
    add,
    AllMovies,
    leftbox,
    middlebox,
    rightbox
  } = styles;

  //fetch Movies
  const [movies, setMovies] = useState([]);

  const url = "http://localhost:7000/movies";

  //Fetch client list

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios
        .get("http://localhost:7000/movies", {
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
        <title>VHS Movie Hiring | Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

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
                  <a href="users#">Movies</a>
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
                  <a href="/users/dashboard/wallet">
                    {" "}
                    Wallet <span>&#128176;</span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    {" "}
                    <strong>Logout <span>&#8618;</span></strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <MovieSlideshow/> */}

      </div>
<hr style={{marginBottom:"10px"}}/>
        {/* <div className={box}> */}
            <div className={leftbox} id = "leftbox">
                    <h3>BlockBuster Package</h3>

                    {movies.map((movies, id) => {
                        return (
                        <div key={movies.id}>
                            
                            <div >
                                <img src={movies.poster} alt="image" style={{width: "350px", height:"350px", borderRadius:"10px", boxShadow:"1px 1px 1px 1px white"}}/>
                            </div>
                            <div className={detail}>
                                <div className={title}>{movies.movie_title} </div>
                                <div className={desc}>{movies.movie_description}</div>
                                <div className={price}>${movies.price} {MoviePrice}</div>
                                <div>Total Price {totalPrice}$</div>
                            </div>
                            <div className={(setquan, setbg)}>
                                <div className={sQuantity}>Duration (in days) {quantity}</div>
                                <div className={btns}>
                                    <button className={btn} onClick={incrementQuentaty}>
                                    +
                                    </button>
                                    <button className={btn} onClick={decrementQuantity}>
                                    -
                                    </button>
                                </div>
                            </div>
                           
                            <div className={(add, setbg)}>
                                <button className={btn} onClick={handleClick}>
                                Add to Cart
                                </button>
                            </div>

                        </div>
                        );
                    })}
                
            </div> 
              
            <div className={middlebox} id = "middlebox">
                <h3>Si-Fi Package</h3>
                <div >
                        <img src="/img/movie-poster-after.jpg" alt="image" style={{width: "350px", height:"350px", borderRadius:"10px", boxShadow:"2px 2px 2px 2px"}}/>
                    </div>
                    <div className={detail}>
                        <div className={title}>Movie Title: After</div>
                        <div className={desc}>Movie Description</div>
                    </div>
                    <div className={(setquan, setbg)}>
                        <div className={sQuantity}>Duration (in days) {quantity}</div>
                        <div className={btns}>
                            <button className={btn} onClick={incrementQuentaty}>
                            +
                            </button>
                            <button className={btn} onClick={decrementQuantity}>
                            -
                            </button>
                        </div>
                    </div>
                    <div className={price}>
                        <div> Package Price {MoviePrice}$</div>
                    <div>Total Price {totalPrice}$</div>
                </div>
                <div className={(add, setbg)}>
                <button className={btn} onClick={handleClick}>
                    Add to Cart
                </button>
                </div>
            </div>
              
            <div className={rightbox} id = "rightbox">
                <h3>Comedy Package</h3>
                <div >
                        <img src="/img/movie-poster-after.jpg" alt="image" style={{width: "350px", height:"350px", borderRadius:"10px", boxShadow:"1px 1px 1px 1px white"}}/>
                    </div>
                    <div className={detail}>
                        <div className={title}>Movie Title: After</div>
                        <div className={desc}>Movie Description</div>
                    </div>
                    <div className={(setquan, setbg)}>
                        <div className={sQuantity}>Duration (in days) {quantity}</div>
                        <div className={btns}>
                            <button className={btn} onClick={incrementQuentaty}>
                            +
                            </button>
                            <button className={btn} onClick={decrementQuantity}>
                            -
                            </button>
                        </div>
                    </div>
                    <div className={price}>
                        <div> Package Price {MoviePrice}$</div>
                    <div>Total Price {totalPrice}$</div>
                </div>
                <div className={(add, setbg)}>
                <button className={btn} onClick={handleClick}>
                    Add to Cart
                </button>
                </div>
            </div>
        {/* </div> */}
    </div>
  );
};

export default UsersDashboard;