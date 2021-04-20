import React, { useState, useEffect } from "react";
import Add from "../../../Component/Admin/Users/Add"
import Admin from "../../../Component/Layout/Admin";

export default function users() {
  const [users, setUsers] = useState([]);
  const [editStu, setEditStu] = useState([]);
  const [delId, setDelID] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
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
        first_name: firstName,
        last_name: lastName,
        username: userName,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
      };

      fetch(`http://localhost:3002/users/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {console.log(result), getData()})
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

      await fetch(`http://localhost:3002/users/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result){
          let removed = 
            users.filter((user) => user.id !== id);
           
          setUsers([...removed])
        }})
        .catch((error) => console.log("error", error));
    } catch (err) {
      alert(err);
    }
  };

  function getData(){
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3002/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result), console.log(result);
      })
      .catch((error) => console.log("error", error));
    }

  useEffect( () => {
    getData()
  }, []);

  const findStu = (id) => {
    const item = users.find((stu) => stu.id === id);

    setEditStu(item);
    console.log("editstu", editStu);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setUserName(item.username);
    setUpdateId(item.id);
  };

  return (
    <>
      <Admin title="users">
        <span>
          <h1>User List</h1>
          <button
            className="btn btn-primary float-right"
            type="button"
            data-toggle="modal"
            data-target="#addstudent"
            data-uid="1"
          >
            Add User
          </button>
        </span>
        <Add users={users} setUsers={setUsers} />
        <div className="row">
          <table className="table table-hover table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody key={user.id}>
                <tr id="d1">
                  <td>{user.id}</td>
                  <td id="f1">{user.first_name}</td>
                  <td id="l1">{user.last_name}</td>
                  <td id="m1">{user.username}</td>
                  <td>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#edit"
                      data-uid="1"
                      className="update btn btn-warning btn-sm"
                      onClick={() => findStu(user.id)}
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
                      onClick={() => setDelID(user.id)}
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
                  id="username"
                  type="text"
                  className="form-control"
                  name="id"
                  value={userName}
                  placeholder="Username"
                  readOnly
                />
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  name="fname"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  name="lname"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
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
                  onClick={() => deleteUser(delId)}
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
      </Admin>
    </>
  );
}
