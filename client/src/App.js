import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { AiOutlineMenu } from 'react-icons/ai';
import logo from './assets/images/logonew@2x.png';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount';
import NewListing from './components/NewListing';
import Logout from './components/Logout';
import Listings from './components/Listings';
import Listing from './components/Listing';
import User from './components/User';
import UpdatePassword from './components/UpdatePassword';
import UpdateListing from './components/UpdateListing';
import DeleteListing from './components/DeleteListing';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import PasswordReset from './components/PasswordReset';
import NewPassword from './components/NewPassword';
import ScrollToTop from './ScrollToTop.js';

function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      {/*Logo and Menu*/}
      <div className="flex items-center justify-between p-6 ">
        <div className="">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32 lg:w-auto" />
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="focus:outline-none lg:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} pt-1 px-5 lg:flex`}>
        <ul
          className="text-xl lg:bg-white lg:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">About</Link>
          </li>
          <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">Contact Us</Link>
          </li>
          <li className="p-2 lg:px-6 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
          <li className="p-3 bg-themeOrange text-white lg:mx-6 lg:px-6 lg:rounded-full lg:hover:shadow-xl lg:cursor-pointer">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      {/*Logo and Menu*/}
      <div className="flex items-center justify-between p-6 ">
        <div className="">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32 lg:w-auto" />
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="focus:outline-none lg:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} pt-1 px-5 lg:flex`}>
        <ul
          className="text-xl lg:bg-white lg:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          <li className="p-2 lg:p-4 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 lg:p-4 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">About</Link>
          </li>
          <li className="p-2 lg:p-4 lg:mx-6 lg:hover:bg-gray-200 lg:rounded-lg lg:cursor-pointer">
            <Link to="/">Contact Us</Link>
          </li>
          <li className="p-2 lg:p-4 lg:mx-2 lg:hover:bg-gray-200 lg:rounded-lg lg:hover:bg-yellow-300 lg:text-orange-400 lg:hover:text-gray-900 lg:cursor-pointer">
            <Link to="/my-account">My Account</Link>
          </li>
          <li className="p-2 lg:p-4 lg:mx-2 lg:hover:bg-gray-200 lg:rounded-lg lg:hover:bg-green-600 lg:text-green-400 lg:hover:text-white lg:cursor-pointer">
            <Link to="/new-listing">New Listing</Link>
          </li>
          <li className="p-3 bg-red-400 text-white lg:mx-2 lg:p-4 lg:rounded-full lg:hover:bg-red-900 lg:cursor-pointer">
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const { isAuth } = useContext(AuthContext);

  const navbar = isAuth ? <NavbarUser /> : <NavbarGuest />;

  return (
    <Router>
      <div className="p-0 flex flex-col min-h-screen min-w-screen lg:max-w-screen-xl lg:mx-auto">
        <header className="">{navbar}</header>
        <main className="flex flex-col flex-grow">
          {/* <div className="bg-red-400 w-auto"> */}
          {/* Components */}
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute path="/my-account" component={MyAccount} />
            <ProtectedRoute path="/new-listing" component={NewListing} />
            <Route path="/logout" component={Logout} />
            <Route path="/listings" exact component={Listings} />
            <Route path="/listing/:id" component={Listing} />
            <Route path="/users/:id" component={User} />
            <Route path="/update-password" component={UpdatePassword} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/new-password/:token" component={NewPassword} />
            <ProtectedRoute path="/listings/:id" component={UpdateListing} />
            <ProtectedRoute path="/delete/:id" component={DeleteListing} />
            <Route component={NotFound} />
          </Switch>
          {/* </div> */}
        </main>
        <footer className="p-4 pl-6 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">&copy;roomie.com</p>
          </div>
          <div>
            <ul className="flex flex-col ml-16 pr-6 justify-end text-sm lg:text-base lg:flex-row">
              <li className="lg:mx-10">
                <p className="font-bold">Credits:</p>
              </li>
              <li className="lg:mx-10">
                <a
                  href="https://icons8.com/icon/tg0qF8v_aLU2/empty-bed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Empty Bed icon by Icons8
                </a>
              </li>
              <li className="lg:mx-10">
                <a
                  href="https://blush.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Illustration by Blush.design
                </a>
              </li>
              <li className="lg:mx-10">
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Images from Unsplash
                </a>
              </li>
              {/* <li className="lg:mx-10">
                <Link to="/">Terms of Service</Link>
              </li>
              <li className="lg:mx-10">
                <Link to="/">Privacy Policy</Link>
              </li> */}
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
}
