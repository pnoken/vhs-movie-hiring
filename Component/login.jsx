import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/auth.module.css";
import isAlphanumeric from "validator/lib/isAlphanumeric";

const LoginForm = () => {

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
  const loginurl = `http://localhost:7000/users`;

  //function to submit login form data
  const onSubmit = (data = { username, password }) => {
    console.log("data is", data);
    axios
      .get(loginurl, {
        username: data.username,
        password: data.password
      })
      .then(resp => {
        //If user credentials are correct and login successful
        if (resp.status == 200) {
          window.location = "users";
          alert("Login Successful");
          console.log(resp.data);
          localStorage.setItem("admin", JSON.stringify(resp.data));
        } else {
          //if user credentials are inccorect and login unsuccessful
          window.location.href = "login";
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
  console.log(watch("username", "password"));
  console.log(errors.username, errors.password);

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
          <i style={{ fontSize: "64px" , marginBottom: "10px"}} class="fas">
            &#xf406;
          </i>
            <br/>
          <h3>Enter your credentials below to login</h3>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className={styles.InputField}
              placeholder="Enter a valid email or username"
              name="username"
              id="username"
              {...register("username",{
                required: true,
                minLength: 8
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
              })}
            />
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
            Don't Have an Account?
          <a href="/signup" className={styles.signuplnk}>
            Sign up
          </a>
        </div>
      </main>

      <footer className={styles.footer}>&#169; VHS - Movie Hiring.</footer>
    </div>
  );
};
export default LoginForm;
