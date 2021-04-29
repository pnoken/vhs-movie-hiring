import axios from "axios";
import Head from "next/head";
import React, { useRef,useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {FaEye} from "react-icons/fa";
import {FaUserFriends} from "react-icons/fa";
import styles from "../styles/auth.module.css";
// import isAlphanumeric from "validator/lib/isAlphanumeric";

const SignUpForm = () => {
  //Using react hook - form to handle form events

  const {
    register, handleSubmit = async e => {
      {e.preventDefault;}
    }, watch, formState: { errors } } = useForm();

  //Password visibility function
  const passwordvisibility = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  //Match password validation function
  const password = useRef({});
  password.current = watch("password", "");
  

  //Endpoint -- url for making signup calls
  const signupurl = 'http://localhost:7000/users';

  //function to submit signup form data 
  const onSubmit = (data = {firstName, lastName, userName, password}) => {
    console.log("data is", data);
    axios
      .post(signupurl, {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.userName,
        password: data.password
      })
      .then(resp => {
        //If user details are
        if (resp.status == 201) {
          window.location = "login";
          alert("Sign up Successful");
          console.log(resp.data);
        } else {
          //if user details are not submited
          window.location.href = "#";
          alert("An error occured while signin up. Please try again")
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
  console.log(watch("firstName", "lastName", "userName", "password"));
  console.log(errors.firstName, errors.lastName, errors.userName, errors.password);

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
            <i style={{ fontSize: "64px" , marginBottom: "10px"}}>
              <FaUserFriends/>  
            </i>

            <br/>
            <h4>Enter your details below to sign up for an account.</h4>
         
          <form onSubmit={handleSubmit(onSubmit)}>

            {/*User first name*/}
          <input
              type="text"
              className={styles.InputField}
              placeholder="Enter your first name"
              name="firstName"
              id="firstName"
              {...register("firstName",
              {
                required: true,
                minLength: 2
              })}
            />
            {errors.firstName && (
              <span className={styles.errors}>
                Firstname should be at least 2 characters
              </span>
            )}{" "}

            {/*User last name*/}
        <input
              type="text"
              className={styles.InputField}
              placeholder="Enter a valid email or username"
              name="lastName"
              id="lastName"
              {...register("lastName",
              {
                required: true,
                minLength: 2
              })}
            ></input>
            {errors.username && (
              <span className={styles.errors}>
                Lastname should be at least 2 characters
              </span>
            )}{" "}

            {/*User name/ email*/}
            <input
              type="text"
              className={styles.InputField}
              placeholder="Enter a valid email or username"
              name="userName"
              id="username"
              {...register("userName",
              {
                required: true,
                minLength: 8
                // validate: (input) => isAlphanumeric (input)
              })}
            ></input>
            {errors.userName && (
              <span className={styles.errors}>
                Kindly enter a valid username
              </span>
            )}{" "}

          {/* password */}
            <input
              type="password"
              // style={{width: "450px"}}
              className={styles.InputField}
              placeholder="Enter a valid password"  
              name="password"
              id="password"
              {...register("password",
              {
                required: true,
                minLength: 8,
                message:" Password should be at least 8 characters long."
                // validate: (input) => isAlphanumeric (input)
              })}          
            ></input>
            <center>
            <FaEye
                style={{top: "10px", boxShadow: "1px 1px 1px 1px #e5e5e5", cursor:"pointer"}}
                id="togglepassword"
                onClick={passwordvisibility}
            />{" "}Password visibility
            </center>
            {errors.password && (
              <span className={styles.errors}>
                Password should be at least 8 characters long.
              </span>
            )}{" "}

            {/*Password confirmation / match*/}
            {/* <input
              type="password"
              // style={{width: "450px"}}
              className={styles.InputField}
              placeholder="Repeat password"  
              name="passoword_repeat"
              id="password_repeat"
              {...register("password",{
                required: true,
                minLength: 8,
                validate: value =>
                value === password.current
              })}
              
            ></input>
            {errors.password_repeat && (
              <span className={styles.errors}>
                The passwords do not match
              </span>
            )}{" "} */}
            <br />

            <center>
              <button type="submit" value="submit" className={styles.signuplnk}>
                Sign Up
              </button>
            </center>
          </form>

          <br></br>
            Already have an account?
          <a href="/" className={styles.loginbtn}>
            Login Here
          </a>
        </div>
      </main>

      <footer className={styles.footer}>&#169; VHS - Movie Hiring.</footer>
    </div>
  );
};
export default SignUpForm;
