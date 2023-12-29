import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Settings from "../profile/Settings/Settings";
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({element,toggleDarkMode,darkMode}) => {
  const [open, setOpen] = useState(false);

 



  return (
    <header className={`flex w-full items-center `} style={{backgroundColor:"cornsilk"}}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <div className="block w-full py-5">
              {/* <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                alt="logo"
                className="dark:hidden"
              /> */}
              {/* <p className="insta">iຖŞtคງrค๓</p> */}
              <h1
  className="text-4xl font-bold text-transparent bg-clip-text text-decoration-none"
  style={{
    marginLeft: "-2rem",
    backgroundImage: 'linear-gradient(to right, orange, darkorange)', // Updated gradient colors
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }}
>
  𝓲𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶

</h1>
              {/* <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                alt="logo"
                className="hidden dark:block"
              /> */}
           </div>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                // className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                //   !open && "hidden"
                // } `}
              >
                <ul className="block lg:flex">
                  <Link to={'/home'}>
                  <ListItem >Home</ListItem>
                  
                  </Link>
                  <Link to={'posts'}>
                  <ListItem >Posts</ListItem>
                  </Link>
                  <Link to={'settings'}>
                  <ListItem >Profile</ListItem>
                  </Link>
                  <Link to={'allpost'}>
                  <ListItem >AllPost</ListItem>
                  </Link>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0" style={{marginTop:"-1rem"}}>
              <a
                href="/#"
                className="px-7 py-3 text-base font-medium  hover:text-primary dark:text-white text-decoration-none "
                style={{
                  backgroundImage: 'linear-gradient(to right, orange, darkorange)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}>
                Sign out
              </a>
              <Link to={'settings'}>

              <button
                
                className="rounded-md  px-7 py-3 text-base font-medium text-white  text-decoration-none "
              style={{backgroundColor:"orange",    boxShadow:"2px 2px 9px darkorange"}}>
                Settings
              </button>
              </Link>




              <button onClick={toggleDarkMode} style={{marginLeft:"2rem"}}>
              {darkMode ? <FontAwesomeIcon icon={faSun}  className="fa-2x" /> : <FontAwesomeIcon icon={faMoon}  className="fa-2x"/>}
            </button>


      



              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
      <a
  className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex text-decoration-none"
  style={{
    backgroundImage: 'linear-gradient(to right, orange, darkorange)', // Updated gradient colors
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  }}
>
  {children}
</a>


      </li>






      
    </>
  );
};
