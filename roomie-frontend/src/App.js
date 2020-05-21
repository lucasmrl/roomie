import React, { useContext } from "react";
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
    </ul>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const navbar = isAuth ? <NavbarUser /> : <NavbarGuest />;

  return (
    <Router>
      <div className="antialiased">
        <img src={logo} alt="Logo" />
        {/* {navbar} */}
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
    </Router>
  );
}

export default App;
