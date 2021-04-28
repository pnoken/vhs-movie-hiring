import React, { useState } from "react";

function Add({ movies, setMovies }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState(true);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = {
    name: name,
    price: price,
    release_year: releaseYear,
    rating: rating,
    active: true
  };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
  };

  const submit = async () => {
    fetch(`https://hiring-vhs.herokuapp.com/movies`, requestOptions)
      .then((response) => response.json())
      .then((result) => setMovies([...movies, result]))
      .catch((error) => console.log("error", error));

    // router.push("/login");
  };

  return (
    <div id="addstudent" className="modal fade" role="dialog">
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
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              className="btn btn-success"
              data-dismiss="modal"
              onClick={submit}
            >
              Add
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
  );
}

export default Add;
