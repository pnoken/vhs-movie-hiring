import React, { useEffect, useState } from "react";
import Head from "next/head";
// import Body from 'next/body'
import HeaderElement from "../header";
import FooterElement from "../footer";
import axios from "axios";
import styles from "../../../../styles/users/wallet.module.css";

const MyWallet = () => {
  const {
    body,
    upperDashboardSection,
    circle,
    container,
    virtualCard,
    virtualCardBalance,
    virtualCardField,
    virtualCardLogo,
    virtualCardDisc,
    topup,
    topupLogo,
    topupForm,
    topup_amt,
    topup_amt_rem,
    checkmark,
    topupBtn
  } = styles;

  //function to top-up user wallet

  useEffect(() => {
    const TopupWallet = async () => {
      const response = await axios
        .get("http://localhost:7000/users/wallet", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(response => {
          if (response.status == 201) {
            alert("Top up made successfully");
            console.log("Top up made successfully", response.data);
          } else if (response == 400 || 404) {
            console.log(response.data);
          }
        })
        .catch(err => {
          console.log(
            "The top up was unsuccessful. Kindly try again later ",
            err
          );
        });
    };
    TopupWallet();
  }, []);

  //--function to fetch user details from localStorage--//
  const [id, setID] = useState("");
  const [first_name, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState({});
  const [wallet_id, setWalletid] = useState("");
  const [currency, setCurrency] = useState();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    // const getUserDetails = () =>{
    const userdetails = localStorage.getItem("user");
    if (userdetails) {
      const usercredentials = JSON.parse(userdetails);
      setID(usercredentials.id);
      setFirstname(usercredentials.first_name);
      setLastname(usercredentials.lastname);
      setUsername(usercredentials.username);
      setWallet(usercredentials.wallet);
      setWalletid(usercredentials.wallet.wallet_id);
      setCurrency(usercredentials.wallet.currency);
      setBalance(usercredentials.wallet.balance);

      console.log(usercredentials);
    } else {
      console.log(
        "User credentials unavailable. Your session might have timed out"
      );
      // alert("User details credentials unavailable. Your session might have timed out");
    }
    // }
    // userdetails();
  }, []);

  //other constant variables
  const cardType = "VHS Virtual Card";
  const cardDescription = "This card is a property of VHS-virtual Corp. Please return if found";
  const cardExpiry = "01-01-3001";

  //quantity of items in cart
  const [quantity] = useState("");
  const [addToCart] =useState("")

  return (
    <div>
      <Head>
        <title>Wallet | Virtual Card</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className={body}>
        <div className={upperDashboardSection}>
          <HeaderElement quantity={quantity} addToCart={addToCart} />
        </div>

        <body>
        <div className={container}>
          <div className={virtualCard} id="virtual-card">
            <label className={virtualCardBalance} id="virtual-card-balance">
              Balance: {currency} {balance}
            </label>
            <label className={virtualCardField} id="card-type">
              Type: {cardType}
            </label>
            <br />

            <label className={virtualCardField}>ID: {wallet_id}</label>
            <br />
            <label className={virtualCardField} id="user-name">
              Card Holder: {first_name} {lastname}
            </label>
            <br />
            <label className={virtualCardField} id="date-isu">
              Expiry: {cardExpiry}{" "}
            </label>

            <img
              className={virtualCardLogo}
              id="virtual-card-logo"
              src="/img/vhs-logo.png"
              alt="virtual-card-logo"
              style={{ width: "64px", height: "42px" }}
            />
            <div className={virtualCardDisc} id="">
              <strong>Disclaimer:</strong> {cardDescription}
            </div>
          </div>

          <div className={topup} id="top-up">
              
            <img
              className={topupLogo}
              id="top-up-logo"
              src="/img/money-logo.png"
              alt="top-up-logo"
            
            />

            

            <form className={topupForm} id="top-up-form" onsubmit="">
                <h2
                style={{
                    verticalAlign: "middle",
                    marginTop: "2.5%",
                    marginBottom: "10%"
                }}
                >
                Top up wallet
                </h2> 
            <p style={{ marginTop: "2.5%", marginBottom: "2.5%" }}>
                Enter an amount to top-up with
              </p>

              <input
                className={topup_amt}
                id="top-up-amt"
                type="text"
                name="topup-amount"
                placeholder="Enter wallet topup amount"
              />
              <br />

              <label className={topup_amt_rem}>
                Remember this choice {''}
                <input type="checkbox" />
                <span className={checkmark}></span>
              </label>
              <br />

              <input
                type="submit"
                className={topupBtn}
                id="topup-btn"
                value="Top-up"
              />
            </form>
          </div>
        </div>
      </body>
      </div>

      
      {/* <hr style={{ marginBottom: "10px" }} /> */}
    </div>
  );
};

export default MyWallet;
