import UserLayout from "../../../Component/Users/Layout";
import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [movies, setMovies] = useState([]);
  const [hired, setHired] = useState(false);

  function getMovies() {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3002/movies", requestOptions)
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
    <UserLayout title="User Profile">
      <h2>Movie List</h2>

      {/* <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie Name</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead> */}
      <div className="row">
        {movies.map((movie) => (
          // <tbody key={movie.id}>
          //   <tr id="d1">
          //     <td>{movie.id}</td>
          //     <td id="f1">{movie.name}</td>
          //     <td id="l1">GHS {movie.price}</td>
          //     <td id="m1">{movie.active ? "Available" : "Not Available"}</td>
          //     <td>
          //       {movie.active && !hired ? (
          //         <button  onClick={() => setHired(true)} className="btn btn-primary">hire</button>
          //       ) : movie.active && hired ? (
          //         <button className="btn btn-success" disabled>hired</button>
          //       ) : (
          //         <button className="btn btn-secondary" disabled>hire</button>
          //       )}
          //     </td>
          //   </tr>
          // </tbody>

          <div className="col">
            <div className="card movie_card">
              <img
                src="https://www.joblo.com/assets/images/joblo/posters/2019/02/captin-marvel-poster-international.jpg"
                className="card-img-top"
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
      {/* </table> */}
    </UserLayout>
  );
}
