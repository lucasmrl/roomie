import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function UpdatePassword(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [alert, setAlert] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data) => {
    setIsFetching(true);
    try {
      const response = await axios({
        method: 'PATCH',
        url: '/api/users/updatePassword',
        data,
      });

      if (response.status === 200) {
        setIsFetching(false);
        setAlert(
          <SweetAlert
            success
            title="Yay!"
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
            Password updated!
          </SweetAlert>
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsFetching(false);
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
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
            Your current password didn't match.
          </SweetAlert>
        );
      } else {
        setIsFetching(false);
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
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
            Something wrong happened on our side. Try again later.
          </SweetAlert>
        );
      }
    }
  };

  return (
    <div>
      {alert}
      <div
        className={`${
          isFetching ? '' : 'hidden'
        } w-full bg-yellow-100 m-auto flex justify-center content-center items-center`}
      >
        <ReactLoading type="spin" color="#7BFFB7" height={70} width={70} />
        <p className="text-2xl text-teal-400 mx-4">Processing...</p>
      </div>
      <div className="px-6 py-3 bg-orange-200">
        <h2 className="font-bold text-2xl text-gray-900">Update Password</h2>
        <Link to="/my-account" className="font-sm text-red-400 font-light">
          <h4>My Account</h4>
        </Link>
      </div>
      <div className="px-6 py-3 flex flex-col">
        <div className="lg:w-2/5">
          {alert}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block font-medium text-gray-800">
              Current Password:
            </label>
            <input
              type="password"
              placeholder=""
              name="currentPassword"
              ref={register({ required: true, minLength: 8 })}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />
            {errors.currentPassword && (
              <span className="text-red-600">
                ⚠ Please provide a password with at least 8 characters.
              </span>
            )}

            <label className="block font-medium text-gray-800">
              New Password:
            </label>
            <input
              type="password"
              placeholder=""
              name="password"
              ref={register({ required: true, minLength: 8 })}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />
            {errors.password && (
              <span className="text-red-600">
                ⚠ Please provide a password with at least 8 characters.
              </span>
            )}

            <label className="block font-medium text-gray-800">
              Confirm New Password:
            </label>
            <input
              type="password"
              placeholder=""
              name="passwordConfirm"
              ref={register({
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />
            {errors.passwordConfirm && (
              <span className="text-red-600">
                ⚠ Please provide the same password above
              </span>
            )}
            <input
              type="submit"
              className="block bg-themeYellow mx-1 px-3 lg:mt-2 py-1 lg:m-0 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow lg:w-64"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
