import React, { useState, useEffect } from "react";
import styles from "../../../styles/users/generalmovielist.module.css";

export default function MovieList() {
  //define styles
  const { movielist, movieGrid, movieCard, moviePoster } = styles;

  const [movies, setMovies] = useState([]);
  // const [hired, setHired] = useState(false);

  function getMovies() {
    var requestOptions = {
      method: "GET"
    };

    fetch('http://localhost:7000/movies', requestOptions)
      .then(response => response.json())
      .then(result => {
        setMovies(result), console.log(result);
      })
      .catch(error => console.log("error", error));
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "5%",
          backgroundColor: "rgb(47, 44, 44)",
          flexWrap: "wrap"
        }}
      >
        {movies.map(movie => (
          <div style={{ flex: "1 0 20%", margin: "5px", height: "30%" }}>
            <div
              className="card movie_card"
              style={{
                width: "94%",
                borderRadius: "8px",
                padding: "2px 2px 2px 2px"
              }}
            >
              <img
                src={movie.image_url ? movie.image_url : "https://www.joblo.com/assets/images/joblo/posters/2019/02/captin-marvel-poster-international.jpg"}
                style={{ width: "300px", height: "360px", borderRadius: "8px" }}
                alt="..."
              />
              <div>
                <p>
                  <i
                    className="fas fa-play play_button"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Play Trailer"
                  ></i>
                </p>
                <h6 className="card-title">{movie.name}</h6>
                {movie.active ? (
                  <button
                    // onClick={() => setHired(true)}
                    className="btn btn-primary info"
                  >
                    Add to cart
                    <span className="extra-info">{" "}</span>
                  </button>
                )  : (
                  <button className="btn btn-secondary info" disabled>
                    Add to cart
                    <span className="extra-info">{" "}Movie is available</span>
                  </button>
                )}
                <p>
                  <span className="movie_info float-left">
                    {movie.release_year}
                  </span>{" "}
                  <p>
                    <span className="movie_info float-right">
                      
                      GHS {movie.price}
                    </span>
                  </p>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
