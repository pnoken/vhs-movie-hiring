//Modules and other imports
import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/auth.module.css";
import ProjectHead from '../projectHead'
// import isEmail from 'validator/lib/isEmail';
// import isAlphanumeric from 'validator/lib/isAlphanumeric';


const LoginForm = () => {

  //Using react hook - form to handle form events
  const { register, handleSubmit = async (e) => {
    {e.preventDefault;}
  }, watch, formState: { errors } } = useForm();
    
  //function to submit login form data
  const onSubmit = (data = { username, password }) => {

  //Endpoint -- url for making signup calls
  const url = 'https://vhs-backend-v2.herokuapp.com/login';

    console.log("data is", data);
    axios
      .post(url,{
        email: data.email,
        password: data.password
      })
      .then(resp => {
        //If user credentials are correct and login successful
        if (resp.status == 200) {    
          console.log(resp.data);
          window.location.href='user';
          window.localStorage.setItem('user-data', JSON.stringify(resp.data));
          alert('Login successful');
        }
          else {
            console.log(resp.data);
          }
        }).catch(err => {
        //stay on index, login page if user credentials are incorrect and show alert
            console.log(resp.data);
            window.location = "#";
            alert('Login unsuccessful');
          });
    console.log(data);
  };

  //watch errors in form fields
  console.log(watch("username", "password"));
  console.log(errors.username, errors.password);

  return (
    <div className={styles.body}>
      <ProjectHead/>
        
      <main className={styles.main}>

    {/*Login card container*/}
        <div className={styles.loginCard}>

          <div className={styles.cardInfo}> 
            <div className={styles.logo}>
              <img src="/img/logo.png" alt="logo" style={{width:"150px"}}/>
            </div>

            <div className={styles.welcome}>
              WELCOME BACK
            </div>
            <div style={{width: "fit-content", color: "white"}}>
              Sign in to enjoy <br/>world class movies
            </div>
          </div>

        {/*Login form*/}
          <div className={styles.form}>
            
            <h3>SIGN IN</h3>
         
            <form onSubmit={handleSubmit(onSubmit)}>

          {/*Input for username/email*/}
              <input
                type="email"
                className={styles.InputField}
                placeholder="Email Address"
                name="username"
                id="username"
                {...register("username",
                {
                  required: true,
                  minLength: 2
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.username && (
                <span className={styles.errors}>
                  Kindly enter a valid email or username
                </span>
              )}{" "}
              
          {/*Input for password*/}
              <input
                type="password"
                className={styles.InputField}
                placeholder="Password"
                name="password"
                id="password"
                {...register("password",
                {
                  required: true,
                  minLength: 8
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.password && (
                <span className={styles.errors}>
                  Kindly enter a valid password
                </span>
              )}{" "}
              <br />

                <button type="submit" value="submit" className={styles.loginbtn}>
                  CONTINUE
                </button>
            </form>

            <br></br>
            <center> 
              <span>
                Don't Have an Account?
              </span>
            </center>
              <br></br>
              <a href="/signup" className={styles.signuplnk}>
                  Sign up Here
              </a>
          </div>
        </div>
      </main>
          
    </div>
  );
};
export default LoginForm;
