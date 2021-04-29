import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaUserSecret } from "react-icons/fa";
import styles from "../styles/auth.module.css";
// import isAlphanumeric from "validator/lib/isAlphanumeric";

const SignUpForm = () => {
  //Using react hook - form to handle form events

  const {
    register,
    handleSubmit = async e => {
      {
        e.preventDefault;
      }
    },
    watch,
    formState: { errors }
  } = useForm();

  //Endpoint -- url for making signup calls
  const signupurl = `https://localhost:7000/users`;

  //function to submit signup form data 
  const onSubmit = (data = {first_name, last_name, username, password}) => {
    console.log("data is", data);
    axios
      .post(signupurl, {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password
      })
      .then(resp => {
        //If user details are
        if (resp.status == 201) {
          window.location = "login";
          alert("Sign up Successful");
          console.log(resp.data);
          localStorage.setItem("admin", JSON.stringify(resp.data));
        } else {
          //if user details are not submited
          window.location.href = "#";
          console.log(resp.data);
        }
      })
      .catch(err => {
        console.log("An error occurred while signing you up", err);
        alert("Signup unsuccessful, please try again.");
    });
    console.log(data);
  };

  //watch errors in form fields
  console.log(watch("first_name", "last_name", "username", "password"));
  console.log(errors.first_name, errors.last_name, errors.username, errors.password);

  //return statement
  return (
    <div className={styles.container}>
      <Head>
        <title>VHS Movie Hiring | Sign Up</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <main className={styles.main}>

        <div className={styles.signupcard}>
            {/* <i style={{ fontSize: "64px" , marginBottom: "10px"}} class="fa">
                &#xf0c0;
            </i> */}
            <FaUserSecret style={{ fontSize: "30px", marginBottom: "10px"}} />

            <h4>USER SIGNUP</h4>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            
          <input
              type="text"
              className={styles.InputField}
              placeholder="Enter your first name"
              name="first_name"
              id="first_name"
              {...register("first_name",{
                required: true,
                minLength: 2
              })}
            />
            {errors.first_name && (
              <span className={styles.errors}>
                Firstname should be at least 2 characters
              </span>
            )}{" "}

        <input
              type="text"
              className={styles.InputField}
              placeholder="Enter your last name"
              name="last_name"
              id="last_name"
              {...register("last_name",{
                required: true,
                minLength: 2
              })}
            />
            {errors.username && (
              <span className={styles.errors}>
                Lastname should be at least 2 characters
              </span>
            )}{" "}

            <input
              type="text"
              className={styles.InputField}
              placeholder="Enter a valid email or username"
              name="username"
              id="username"
              {...register("username",{
                required: true,
                minLength: 8
                // validate: (input) => isAlphanumeric (input)
              })}
            />
            {errors.username && (
              <span className={styles.errors}>
                Kindly enter a valid username
              </span>
            )}{" "}
            
            <input
              type="password"
              className={styles.InputField}
              placeholder="Enter a valid password"
              name="password"
              id="password"
              {...register("password",{
                required: true,
                minLength: 8
                // validate: (input) => isAlphanumeric (input)
              })}
            />
            {errors.password && (
              <span className={styles.errors}>
                Password should be at least 8 characters long.
              </span>
            )}{" "}
            <br />
            <center>
              <button type="submit" value="submit" className={styles.loginbtn}>
                Sign Up
              </button>
            </center>
          </form>

          <br></br>
          <span style={{ color: "blue"}}>
            Already have an account?
            <a href="/" className={styles.signuplnk}>
              Login Here
            </a>
          </span>
        </div>
      </main>

      <footer className={styles.footer}>&#169; VHS - Movie Hiring.</footer>
    </div>
  );
};
export default SignUpForm;
