import React, { useState, useEffect } from "react";
export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [hired, setHired] = useState(false);

  function getMovies() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:7000/movies", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMovies(result), console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div  style={{display: "table", width: "100%", marginTop: "5%", backgroundColor: "darkgray"}}>
  
        {movies.map((movie) => (
          <div style={{display: "table-cell"}}>
            <div className="card movie_card">
              <img
                src="https://www.joblo.com/assets/images/joblo/posters/2019/02/captin-marvel-poster-international.jpg"
                style={{width: "240px", height: "360px"}}
                alt="..."
              />
              <div className="card-body">
                <i
                  className="fas fa-play play_button"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Play Trailer"
                ></i>
                <h5 className="card-title">{movie.name}</h5>
                {movie.active && !hired ? (
                  <button
                    onClick={() => setHired(true)}
                    className="btn btn-primary info"
                  >
                    hire
                    <span className="extra-info">Available for hiring</span>
                  </button>
                ) : movie.active && hired ? (
                  <button className="btn btn-success" disabled>
                    hired
                  </button>
                ) : (
                  <button className="btn btn-secondary info" disabled>
                    hire
                    <span className="extra-info">Unavailable for hiring</span>
                  </button>
                )}
                <span className="movie_info">{movie.release_year}</span>
                <span className="movie_info float-right">
                  <i className="fas fa-star"></i>
                  {movie.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
