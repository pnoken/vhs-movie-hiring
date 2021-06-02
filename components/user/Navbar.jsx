// Modules and other imports
import { useEffect, useState } from 'react';
import UserNavbar from './UserNavigationBar';
import GuestNavbar from './GuestNavigationBar';

const Navbar = () => {
  //navigation bar for when user is logged in
  // const LoggedInNavigation = ()=>{
  //   return <UserNavbar/>
  // }
  //navigation bar for when user is not logged in
  //   const Loggedoutnavigation = ()=>{
  //     return <GuestNavbar/>
  // }

  //State objects for all navigation bars
  const [renderLoggedInNavbar, setrenderLoggedInNavbar] = useState(false);
  // const [renderGuestNavbar, setrenderGuestNavbar] = useState(true);

  // const showLoggedInNavbar = async () => {
  //   const userLoggedIn = window.localStorage.getItem('user-data');
  //   if (userLoggedIn) {
  //     setrenderLoggedInNavbar(true);
  //   }
  // };

  // const showGuestNavbar = () => {
  //   const userLoggedOut = window.localStorage.getItem("user-data" == undefined);
  //   if (userLoggedOut){
  //     setrenderGuestNavbar(true);
  //     setrenderLoggedInNavbar(false);
  //   } else{
  //       setrenderLoggedInNavbar(true)
  //   }

  // }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLoggedIn = window.localStorage.getItem('user-data');
      if (userLoggedIn) {
        setrenderLoggedInNavbar(true);
      }
    }
  });

  return (
    <div>
      {renderLoggedInNavbar ? (
        <UserNavbar setIsLoggedIn={setrenderLoggedInNavbar} />
      ) : (
        <GuestNavbar />
      )}
      {/* {renderGuestNavbar } */}
    </div>
  );
};

export default Navbar;
