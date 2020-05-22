import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";
import NewListing from "./components/NewListing";
import Logout from "./components/Logout";
import Listings from "./components/Listings";
import Listing from "./components/Listing";
import User from "./components/User";
import UpdatePassword from "./components/UpdatePassword";
import UpdateListing from "./components/UpdateListing";
import DeleteListing from "./components/DeleteListing";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import { AuthContext } from "./context/AuthContext";
import logo from "./assets/images/logo.png";
import { AiOutlineMenu } from "react-icons/ai";

function NavbarGuest() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container lg:flex">
      <div className="flex px-2 py-2 items-center justify-between lg:w-1/2">
        <div className="sm:max-w-xl sm:px-0 lg:max-w-none">
          <img src={logo} alt="Logo" className="h-8 px-8" />
        </div>
        <div>
          <button
            type="button"
            className="pr-8 my-2 text-2xl focus:outline-none lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } p-4 bg-gray-200 lg:bg-white lg:flex lg:w-1/2`}
      >
        <ul className="lg:flex">
          <li className="p-2 rounded hover:bg-gray-300">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 rounded hover:bg-gray-300">
            <Link to="/">About</Link>
          </li>
          <li className="p-2 rounded hover:bg-gray-300">
            <Link to="/">Contact Us</Link>
          </li>
          <li className="p-2 lg:ml-56 rounded hover:bg-gray-300">
            <Link to="/login">Login</Link>
          </li>
          <li className="p-2 rounded  hover:bg-gray-300 lg:text-white lg:bg-themeOrange lg:rounded-lg lg:hover:bg-themeOrange lg:hover:font-bold">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function NavbarUser() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/my-account">My Account</Link>
      </li>
      <li>
        <Link to="/new-listing">New Listing</Link>
      </li>
      <li>
        <Link to="/logout">Log out</Link>
      </li>
    </ul>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const navbar = isAuth ? <NavbarUser /> : <NavbarGuest />;

  return (
    <div className="lg:flex lg:flex-col">
      <Router>
        <div className="">
          {navbar}
          <div className="lg:h-auto">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <ProtectedRoute path="/my-account" component={MyAccount} />
              <ProtectedRoute path="/new-listing" component={NewListing} />
              <Route path="/logout" component={Logout} />
              <Route path="/listings" exact component={Listings} />
              <Route path="/listing/:id" component={Listing} />
              <ProtectedRoute path="/users/:id" component={User} />
              <Route path="/update-password" component={UpdatePassword} />
              <ProtectedRoute path="/listings/:id" component={UpdateListing} />
              <ProtectedRoute path="/delete/:id" component={DeleteListing} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="hidden lg:flex lg:justify-between lg:h-16 lg:content-center lg:items-center lg:my-4 xl:my-0">
            <div>
              <p className="px-8 lg:font-medium text-gray-800">
                &copy;roomie.com
              </p>
            </div>
            <div>
              <ul className="lg:flex lg:ml-16 lg:pr-6">
                <li className="pr-16">
                  <Link to="/">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
