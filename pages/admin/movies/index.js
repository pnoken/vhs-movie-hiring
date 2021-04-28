import React, { useState, useEffect } from "react";
import { GiStoneCrafting } from "react-icons/gi";
import Add from "../../../Component/Admin/Movies/Add";
import AdminLayout from "../../../Component/Layout/Admin";

export default function movies() {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState([]);
  const [delId, setDelID] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState(true);
  const [updateId, setUpdateId] = useState();
  //const [token, setToken] = useState("");

  // useEffect(() => {
  //   let lStorage = window.localStorage.getItem("auth");
  //   if (lStorage) {
  //     lStorage = JSON.parse(lStorage);
  //     console.log("local", lStorage.id);
  //     setToken(lStorage.token);
  //   }
  // }, []);

  const updateMov = async (id) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        price: price,
        release_year: releaseYear,
        rating: rating,
        active: availability,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
      };

      fetch(`${process.env.API_URL}/movies/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result), getData();
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      alert("Could not update");
    }
  };

  const deleteMovie = async (id) => {
    try {
      var requestOptions = {
        method: "DELETE",
      };

      await fetch(`${process.env.API_URL}/movies/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result) {
            let removed = movies.filter((movie) => movie.id !== id);

            setMovies([...removed]);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      alert(err);
    }
  };

  function getData() {
    var requestOptions = {
      method: "GET",
    };

    fetch(`${process.env.API_URL}/movies`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMovies(result), console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getData();
  }, []);

  const findMovie = (id) => {
    const item = movies.find((stu) => stu.id === id);

    setEditMovie(item);
    //console.log("editMovie", editMovie);
    setName(item.name);
    setPrice(item.price);
    setReleaseYear(item.release_year);
    setRating(item.rating);
    setAvailability(item.availability);
    setUpdateId(item.id);
  };

  return (
    <>
      <AdminLayout title="movies">
        <span>
          <h1>User List</h1>
          <button
            className="btn btn-primary float-right"
            type="button"
            data-toggle="modal"
            data-target="#addstudent"
            data-uid="1"
          >
            Add Movie
          </button>
        </span>
        <Add movies={movies} setmovies={setMovies} />
        <div className="row">
          <table className="table table-hover table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Movie Title</th>
                <th>Price</th>
                <th>Release Year</th>
                <th>Rating</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            {movies.map((movie) => (
              <tbody key={movie.id}>
                <tr id="d1">
                  <td>{movie.id}</td>
                  <td id="f1">{movie.name}</td>
                  <td id="l1">GHS {movie.price}</td>
                  <td id="m1">{movie.release_year}</td>
                  <td id="m1">{movie.rating}</td>
                  <td id="m1">{movie.active ? "Available" : "Unavailable"}</td>
                  <td>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#edit"
                      data-uid="1"
                      className="update btn btn-warning btn-sm"
                      onClick={() => findMovie(movie.id)}
                    >
                      <img src="/open-iconic/svg/edit.svg" alt="update" />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#delete"
                      data-uid="1"
                      className="delete btn btn-danger btn-sm"
                      onClick={() => setDelID(movie.id)}
                    >
                      <img src="/open-iconic/svg/delete.svg" alt="delete" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div id="edit" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
              </div>
              <div className="modal-body">
                <input
                  id="movie-name"
                  type="text"
                  className="form-control"
                  name="mname"
                  value={name}
                  placeholder="Movie Name"
                  readOnly
                />
                <input
                  id="price"
                  type="text"
                  className="form-control"
                  name="mprice"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <input
                  id="release-year"
                  type="text"
                  className="form-control"
                  name="ryear"
                  value={releaseYear}
                  placeholder="Release Year"
                  onChange={(e) => {
                    setReleaseYear(e.target.value);
                  }}
                />
                <input
                  id="rating"
                  type="text"
                  className="form-control"
                  name="rt"
                  value={rating}
                  placeholder="Rating"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
                <input
                  id="availability"
                  type="text"
                  className="form-control"
                  name="av"
                  value={availability}
                  placeholder="Availability"
                  onChange={(e) => {
                    setAvailability(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="up"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={() => updateMov(updateId)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="delete" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <h4 className="modal-title">Delete Data</h4>
              </div>
              <div className="modal-body">
                <strong>Are you sure you want to delete this data?</strong>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="del"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => deleteMovie(delId)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
