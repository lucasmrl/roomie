import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import imgLogin from '../assets/images/img-login@2x.png';

function Login(props) {
  const [data, setData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState('');

  const { setIsAuth } = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } }; //Default origin is from the route that sent to the login page OR from "/" root

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/login',
        data,
      });

      if (response.status === 200) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userID', response.data.data.user._id);
        setIsAuth(true);
        history.replace(from);
      }
    } catch (error) {
      return setAlert(
        <SweetAlert
          danger
          title="Something Wrong.."
          customButtons={
            <React.Fragment>
              <input
                onClick={() => setAlert(null)}
                value="Ok"
                type="submit"
                className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
              />
            </React.Fragment>
          }
        >
          E-mail and/or password not correct.{' '}
        </SweetAlert>
      );
    }
  };

  return (
    <div className="p-6 flex flex-grow flex-col lg:items-center lg:justify-center">
      {alert}
      <div className="lg:max-w-none lg:flex lg:flex-row lg:bg-gray-100 lg:shadow-inner lg:shadow-2xl lg:max-w-6xl lg:max-w-6xl">
        {/* Form */}
        <div className="lg:w-2/3 lg:mx-auto lg:p-16">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h1 className="font-bold text-2xl text-gray-900 lg:text-5xl">
              Sign in
            </h1>
            <p className="font-light text-gray-900">
              Don’t have an account?
              <Link to="/signup" className="text-blue-700">
                {` `}Sign Up
              </Link>
            </p>
            <label className="font-medium text-gray-900 mt-10">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="email@email.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              className="my-4 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <label className="font-medium text-gray-900">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="my-4 shadow p-1 appearance-none text-xl border lg:px-4 lg:text-xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <p className="font-light text-gray-900">
              <Link to="/password-reset" className="text-red-500">
                Forgot password?
              </Link>
            </p>
            <input
              type="submit"
              value="Submit"
              className="mt-6 md:inline bg-themeYellow mx-1 px-3 lg:mt-6 py-1 lg:ml-6 lg:mx-8 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
            />
          </form>
        </div>
        {/* Img */}
        <div className="lg:w-3/6 lg:flex">
          <img className="hidden lg:flex" src={imgLogin} alt="Rooms" />
        </div>
      </div>
    </div>
  );
}

export default Login;
