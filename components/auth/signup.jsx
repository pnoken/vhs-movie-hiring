//Modules and other imports
import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProjectHead from '../projectHead'
import styles from "../../styles/auth.module.css";
// import isEmail from 'validator/lib/isEmail';
// import isAlphanumeric from 'validator/lib/isAlphanumeric';
// import isAlpha from 'validator/lib/isAlpha';
// import isDate from 'validator/lib/isDate';


const SignupForm = () => {
  
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

  //set up user role
  const [role, setRole] = useState ("member");
  // setRole(role);
    
  //function to submit login form data
  const onSubmit = (data = { first_name, last_name, username, email, password, age}) => {

  //Endpoint -- url for making signup calls
  const url = 'https://vhs-project-backend.herokuapp.com/auth/signup';

    console.log("data is", data);
    axios
      .post(url,
        {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        password: data.password,
        age: data.age
        
      })
      .then(resp => {
        //If user credentials are correct and Signup successful
        if (resp.status == 201||200) {    
          console.log(resp.data);
          window.location.href='user';
          alert('Signup successful');
        }
          else {
            console.log(resp.data);
          }
        }).catch(err => {
        //stay on page, if error occurs and ... 
            // console.log(resp.data);
            window.location = "#";
            alert('We could not sign you up, kindly try again later.');
          });
    console.log(data);
  };

  //watch errors in form fields
  console.log(watch("firstname", "lastname", "username", "email", "age", "password"));
  console.log(errors.firstname, errors.lastname, errors.username, errors.email, errors.age, errors.password);

  return (
    <div className={styles.body}>
      <ProjectHead />
 
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
            
            <h3>SIGN UP</h3>
         
            <form onSubmit={handleSubmit(onSubmit)}>

          {/*Input for firstname*/}
          <input
                type="text"
                className={styles.InputField}
                placeholder="First Name"
                name="first_name"
                id="firstname"
                {...register("first_name",
                {
                  required: true,
                  minLength: 2,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                  }
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.first_name && (
                <span className={styles.errors}>
                  Kindly enter a valid firstname
                </span>
              )}{" "}

          {/*Input for Lastname*/}
          <input
                type="text"
                className={styles.InputField}
                placeholder="Last Name"
                name="last_name"
                id="lastname"
                {...register("last_name",
                {
                  required: true,
                  minLength: 2,
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                  }
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.last_name && (
                <span className={styles.errors}>
                  Kindly enter a valid lastname
                </span>
              )}{" "}

{/*--------------*/}
          {/*Input for username*/}
              <input
                type="text"
                className={styles.InputField}
                placeholder="Username"
                name="username"
                id="username"
                {...register("username",
                {
                  required: true,
                  minLength: 2,
                  pattern: {
                    value: /^[aA-zZ0-9]+$/,
                  }
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.username && (
                <span className={styles.errors}>
                  Kindly enter a valid username
                </span>
              )}{" "}
{/*--------------*/}


          {/*Input for email*/}
          <input
                type="email"
                className={styles.InputField}
                placeholder="Email Address"
                name="email"
                id="email"
                {...register("email",
                {
                  required: true,
                  minLength: 2,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  }
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.email && (
                <span className={styles.errors}>
                  Kindly enter a valid email
                </span>
              )}{" "}

          {/*Input for user age*/}
          <input
                type="text"
                className={styles.InputField}
                name="age"
                id="age-of-user"
                placeholder="Age"
                {...register("age",
                {
                  required: true,
                  minLength: 1,
                  pattern: {
                    value: /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/i
                  }                 
                })}
              ></input>
          {/*Input Error messgae*/}
              {errors.age && (
                <span className={styles.errors}>
                  Kindly enter your age
                </span>
              )}
              
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

                <button type="submit" value="submit" className={styles.loginbtn}>
                  SIGN UP
                </button>
            </form>

            <br></br>
            <center> 
              <span>
                Already have an account?
              </span>
            </center>
              <br></br>
              <a href="login" className={styles.signuplnk}>
                  Login in Here
              </a>
          </div>
        </div>
      </main>
          
    </div>
  );
};
export default SignupForm;
