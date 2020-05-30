import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import imgLogin from '../assets/images/img-login@2x.png';

function PasswordReset() {
  const [data, setData] = useState({ email: '' });
  const [alert, setAlert] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/forgotPassword',
        data,
      });

      if (response.status === 200) {
        return setAlert(
          <SweetAlert
            success
            title="Password Sent."
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
            Please check your mailbox with the instructions to reset your
            password.
          </SweetAlert>
        );
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
          Please, try again later.
        </SweetAlert>
      );
    }
  };

  return (
    <div className="p-6 flex flex-grow flex-col lg:items-center lg:justify-center">
      {alert}
      <div className="lg:max-w-none lg:flex lg:flex-row lg:bg-gray-100 lg:shadow-inner lg:shadow-2xl lg:max-w-6xl">
        {/* Form */}
        <div className="lg:w-2/3 lg:mx-auto lg:p-16">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h1 className="font-bold text-2xl text-gray-900 lg:text-5xl">
              Forgot Password?
            </h1>
            <p className="py-6 text-gray-600 lg:w-2/3">
              Enter the email address you used when you signed up and you will
              receive instructions to reset your password.
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
            <input
              type="submit"
              value="Submit"
              className="md:inline bg-themeYellow mx-1 px-3 lg:mt-2 py-1 lg:ml-6 lg:mx-8 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
            />
          </form>
        </div>
        {/* Img */}
        <div className="lg:w-2/6 lg:flex">
          <img className="hidden lg:flex" src={imgLogin} alt="Rooms" />
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
