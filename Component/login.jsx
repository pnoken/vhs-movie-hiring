import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaUserSecret } from "react-icons/fa";
import styles from "../styles/auth.module.css";
import {FaEye} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa"
import isAlphanumeric from "validator/lib/isAlphanumeric";

const LoginForm = () => {

  //Using react hook - form to handle form events
  const { register, handleSubmit = async (e) => {
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

    
  //function to submit login form data
  const onSubmit = (data = { userName, password }) => {

  //Endpoint -- url for making signup calls
  const loginurl = `http://localhost:7000/user?userName=${data.userName}&password=${data.password}`;

    console.log("data is", data);
    axios
      .get(loginurl)
      .then(resp => {
        //If user credentials are correct and login successful
        if (resp.status == 200) {    
          console.log(resp.data);
          if(resp.data.length==0){
            console.log("user not found");
            alert("Login unsuccessful, kindly check your credentials and try again");
          }
          else {
            console.log("user-found");
            localStorage.setItem("user-credentials", JSON.stringify(resp.data));
            alert("Login Successful");
            window.location = "users";
          }
        } else {
          //if user credentials are inccorect and login unsuccessful
          window.location.href = "#";
          console.log(resp.data);
        }
      })
      .catch(err => {
        console.log("An error occurred while logging in", err);
        alert("Kindly enter valid credentials");
      });
    console.log(data);
  };

  //watch errors in form fields
  console.log(watch("userName", "password"));
  console.log(errors.userName, errors.password);

  return (
    <div className={styles.container}>
      <Head>
        <title>VHS Movie Hiring | Login</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <main className={styles.main}>

        <div className={styles.card}>
          <i style={{ fontSize: "64px" , marginBottom: "10px"}}>
            <FaUserCircle/>  
          </i>
            <br/>
          <h3>Enter your credentials below to login</h3>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className={styles.InputField}
              placeholder="Enter a valid email or username"
              name="userName"
              id="username"
              {...register("userName",
              {
                required: true,
                minLength: 2
              })}
            ></input>
            {errors.userName && (
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
              {...register("password",
              {
                required: true,
                minLength: 8
              })}
            ></input>

              <center>
                <FaEye
                    style={{ boxShadow: "1px 1px 1px 1px #e5e5e5", cursor:"pointer"}}
                    id="togglepassword"
                    onClick={passwordvisibility}
                />{" "}Password visibility
              </center>

            {errors.password && (
              <span className={styles.errors}>
                Kindly enter a valid password
              </span>
            )}{" "}
            <br />
            <center>
              <button type="submit" value="submit" className={styles.loginbtn}>
                Login
              </button>
            </center>
          </form>

          <br></br>
          <span style={{ color: "blue"}}>
            Don't Have an Account? 
            <a href="/signup" className={styles.signuplnk}>
              Sign Up Here
            </a>
          </span>
        </div>
      </main>

      <footer className={styles.footer}>&#169; VHS - Movie Hiring.</footer>
    </div>
  );
};
export default LoginForm;
