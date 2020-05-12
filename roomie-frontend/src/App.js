import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "./context/AuthContext";

function NavbarGuest() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/listings">Listings</Link>
      </li>
      <li>
        <Link to="/listing/5eba1d81fe50bb183267359e">
          Listing 5eba1d81fe50bb183267359e
        </Link>
      </li>
      <li>
        <Link to="/users/5eb24f8e4c713657506282de">
          User 5eb24f8e4c713657506282de
        </Link>
      </li>
    </ul>
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
      <li>
        <Link to="/listings">Listings</Link>
      </li>
      <li>
        <Link to="/listing/5eba1d81fe50bb183267359e">
          Listing 5eba1d81fe50bb183267359e
        </Link>
      </li>
      <li>
        <Link to="/users/5eb24f8e4c713657506282de">
          User 5eb24f8e4c713657506282de
        </Link>
      </li>
    </ul>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const navbar = isAuth ? <NavbarUser /> : <NavbarGuest />;

  return (
    <Router>
      <div>
        {navbar}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/new-listing" component={NewListing} />
          <Route path="/logout" component={Logout} />
          <Route path="/listings" component={Listings} />
          <Route path="/listing/5eba1d81fe50bb183267359e" component={Listing} />
          <Route path="/users/5eb24f8e4c713657506282de" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;