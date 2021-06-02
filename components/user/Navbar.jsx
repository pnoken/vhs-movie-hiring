// Modules and other imports
import { useEffect, useState } from 'react';
import UserNavbar from './UserNavigationBar';
import GuestNavbar from './GuestNavigationBar';

const Navbar = () => {
  //State objects for all navigation bars
  const [renderLoggedInNavbar, setrenderLoggedInNavbar] = useState(false);

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
    </div>
  );
};

export default Navbar;
