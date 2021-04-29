import React, { useState, useEffect } from "react";
import AddMovie from "../../../Component/Admin/Movies/Add";
import NewAdminLayout from '../../../Component/Layout/NewAdminLayout';

export default function movies() {
	const [movies, setMovies] = useState([]);
	const [editStu, setEditStu] = useState([]);
	const [delId, setDelID] = useState(0);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [status, setStatus] = useState("");
	const [updateId, setUpdateId] = useState();
	const [token, setToken] = useState("");
  
	// useEffect(() => {
	//   let lStorage = window.localStorage.getItem("auth");
	//   if (lStorage) {
	//     lStorage = JSON.parse(lStorage);
	//     console.log("local", lStorage.id);
	//     setToken(lStorage.token);
	//   }
	// }, []);
  
	const updateStu = async (id) => {
	  try {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
  
		var raw = JSON.stringify({
		  name: name,
		  price: price,
		  status: status,
		});
  
		var requestOptions = {
		  method: "PUT",
		  headers: myHeaders,
		  body: raw,
		};
  
		fetch(`http://localhost:3002/movies/${id}`, requestOptions)
		  .then((response) => response.json())
		  .then((result) => console.log(result))
		  .catch((error) => console.log("error", error));
	  } catch (error) {
		alert("Could not update");
	  }
	};
  
	const deleteUser = async (id) => {
	  try {
		var requestOptions = {
		  method: "DELETE",
		};
  
		await fetch(`http://localhost:3002/movies/${id}`, requestOptions)
		  .then((response) => response.text())
		  .then((result) => {
			movies.splice(
			  movies.findIndex((stu) => stu.id === id),
			  1
			);
		  })
		  .catch((error) => console.log("error", error));
	  } catch (err) {
		alert(err);
	  }
	};
  
	useEffect(() => {
	  //var myHeaders = new Headers();
	  // myHeaders.append("auth-token", token);
	  async function getData() {
		var requestOptions = {
		  method: "GET",
		};
  
		await fetch("http://localhost:7000/movies", requestOptions)
		  .then((response) => response.json())
		  .then((result) => {
			setMovies(result), console.log(result);
		  })
		  .catch((error) => console.log("error", error));
	  }
	  getData();
	}, []);
  
	const findMov = (id) => {
	  const item = movies.find((stu) => stu.id === id);
  
	  setEditStu(item);
	  console.log("editstu", editStu);
	  setName(item.name);
	  setPrice(item.price);
	};
  
	return (
	  <>
		<NewAdminLayout title="movies">
		  <span>
			<h1>Movie List</h1>
			<button
			  className="btn btn-primary float-right"
			  type="button"
			  data-toggle="modal"
			  data-target="#addstudent"
			  data-uid="1"
			>
			  Add Movies
			</button>
		  </span>
		  <AddMovie />
		  <div className="row">
			<div className="row">
			  {movies.map((movie) => (
				<div className="col">
				  <div className="card movie_card">
					<img
					  src={movie.image_url}
					  className="card-img-top"
					  alt="..."
					/>
					<div className="card-body">
					 
						<span><button
						  type="button"
						  data-toggle="modal"
						  data-target="#edit"
						  data-uid="1"
						  className="update btn btn-warning btn-sm"
						  onClick={() => findMov(movie.id)}
						>
						  <img src="/open-iconic/svg/edit.svg" alt="update" />
						</button></span>
						<span>
						<button
						  type="button"
						  data-toggle="modal"
						  data-target="#delete"
						  data-uid="1"
						  className="delete btn btn-danger btn-sm"
						//   onClick={() => setDelID(user.id)}
						>
						  <img src="/open-iconic/svg/delete.svg" alt="delete" />
						</button></span>
					 
					  <h5 className="card-title">{movie.name}</h5>
					  <span className="movie_info">{movie.release_year}</span>
					  <span className="movie_info float-right">
						<i className="fas fa-star"></i>
						GHS {movie.price}
					  </span>
					</div>
				  </div>
				</div>
			  ))}
			</div>
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
					id="ln"
					type="text"
					className="form-control"
					name="id"
					value={status}
					placeholder="status"
					readOnly
				  />
				  <input
					id="fn"
					type="text"
					className="form-control"
					name="fname"
					value={name}
					placeholder="First Name"
					onChange={(e) => {
					  setName(e.target.value);
					}}
				  />
				  <input
					id="mn"
					type="text"
					className="form-control"
					name="lname"
					value={price}
					placeholder="Last Name"
					onChange={(e) => {
					  setPrice(e.target.value);
					}}
				  />
				</div>
				<div className="modal-footer">
				  <button
					type="button"
					id="up"
					className="btn btn-warning"
					data-dismiss="modal"
					onClick={() => updateStu(updateId)}
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
					onClick={() => deletemovie(delId)}
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
		</NewAdminLayout>
	  </>
	);
  }
  