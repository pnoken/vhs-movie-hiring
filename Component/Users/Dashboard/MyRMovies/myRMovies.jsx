import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Link from "next/link"
import HeaderElement from '../../header'
import FooterElement from '../../footer'
import axios from 'axios'
import styles from "../../../../styles/users/mymovies.module.css"
import NavElement from '../../nav'

const MyRecentMovies = () => {
  const {
    body,
    main_content,
    container,
    card,

  } = styles

  // Endpoints and urls
  const hired_movies_url = `${process.env.API_URL}/hired_movies`

  // State objects
  const [hiredMovies, setHiredMovies] = useState([]);

  
  //Fetch list of hired movies
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios
        .get( hired_movies_url, {
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
            localStorage.setItem("Hired Movies", response.data);
            setHiredMovies(response.data);
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


  return (
    <div>

      <Head>
        <title>VHS Movie Hiring | My Movies</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <body className={body}>

        {/* Navigation Section */}
        <NavElement/>

        {/* Main Content Section */}
        <section className={main_content}>
          <h3>HIRED MOVIES</h3>
          <div>
            {hiredMovies.map((hiredMovies, user_id) => {
              return (
                <div key={hiredMovies.user_id}>
                  <div className={container}>
                    <div className={card}>
                      <h5>Movie Title: {hiredMovies.name}</h5>
                      <h5>Movie Status: {hiredMovies.status}</h5>
                      <h5>Date Hired: {hiredMovies.date_hired}</h5>
                      <h5>Date Returned: {hiredMovies.date_returned}</h5>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </section>
      </body>

      
    </div>
  )
}

export default MyRecentMovies
