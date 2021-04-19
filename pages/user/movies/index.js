import UserLayout from "../../../Component/Users/Layout";
import React, { useState, useEffect } from "react";

export default function UserProfile() {
  const [movies, setMovies] = useState([]);
  const [ hired, setHired ] = useState(false);

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
      <h2>Available Movies</h2>

      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie Name</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        {movies.map((movie) => (
          <tbody key={movie.id}>
            <tr id="d1">
              <td>{movie.id}</td>
              <td id="f1">{movie.name}</td>
              <td id="l1">GHS {movie.price}</td>
              <td id="m1">{movie.active ? "Available" : "Not Available"}</td>
              <td>
                {movie.active && !hired ? (
                  <button  onClick={() => setHired(true)} className="btn btn-primary">hire</button>
                ) : movie.active && hired ? (
                  <button className="btn btn-success" disabled>hired</button>
                ) : (
                  <button className="btn btn-secondary" disabled>hire</button>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </UserLayout>
  );
}
