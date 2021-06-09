import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import $ from 'jquery';

import { BiMenu } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { localStorageToJson, STORETYPES } from '../../utils/shared';
import { Store } from '../../contextStore';
import { Dropdown } from 'react-bootstrap';
import { Admin, Home } from '../../utils/routes';
import notify from '../../utils/toast';

const AdminTopNav = () => {
  const router = useRouter();

  const { state: userData, dispatch } = useContext(Store);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch({
        type: STORETYPES.AUTHUSER,
        payload: localStorageToJson(),
      });
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('user-data');
    notify().info('Logged out successfully');
    router.push(Home);
  };

  const toggleNav = () => {
    $('#wrapper').toggleClass('toggled');
  };

  useEffect(() => {
    $('#wrapper').toggleClass('toggled');
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="nav-link dropdown-toggle text-white"
      href="#"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <>
      <nav className="navbar sticky-top  navbar-expand-lg navbar-light   top-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href={Admin.dashboard}>
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              height="36px"
              width="139px"
            />
          </a>
          <BiMenu
            size={30}
            style={{
              position: 'absolute',
              left: '240.63px',
              top: '12.29px',
              cursor: 'pointer',
            }}
            onClick={toggleNav}
          />
          {/* <button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button> */}
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <Dropdown style={{ backgroundColor: 'transparent' }}>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                    <FaUserCircle size={20} />{' '}
                    {userData.authenticatedUser.user &&
                      userData.authenticatedUser.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              {/* <li className="nav-item ">
                <a className="nav-link text-white" href="#">
                  <FaUserCircle size={20} />{' '}
                  {userData.authenticatedUser.user &&
                    userData.authenticatedUser.user.username}
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminTopNav;
