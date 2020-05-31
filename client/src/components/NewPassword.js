import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import imgSignup from '../assets/images/imgSignup@2x.png';

function NewPassword({ match }) {
  const { setIsAuth } = useContext(AuthContext);
  const [alert, setAlert] = useState('');

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `/api/users/resetPassword/${match.params.token}`,
        data,
      });

      if (response.status === 200) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userID', response.data.data.user._id);
        setIsAuth(true);
        return setAlert(
          <SweetAlert
            success
            title="Password Changed."
            customButtons={
              <React.Fragment>
                <input
                  onClick={() => setAlert(<Redirect to={`/my-account`} />)}
                  value="Ok"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          ></SweetAlert>
        );
      }
    } catch (error) {
      return setAlert(
        <SweetAlert
          danger
          title="Woot!"
          customButtons={
            <React.Fragment>
              <input
                onClick={() => setAlert(null)}
                value="Try Again"
                type="submit"
                className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
              />
            </React.Fragment>
          }
        >
          Invalid Token!
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h1 className="font-bold text-2xl text-gray-900 lg:text-5xl">
              Reset your Password
            </h1>

            <label className="mt-16 font-medium text-gray-900">
              New Password:
            </label>
            <input
              type="password"
              placeholder=""
              name="password"
              ref={register({ required: true, minLength: 8 })}
              className="my-4 shadow p-1 appearance-none text-xl border lg:px-4 lg:text-xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />
            {errors.password && (
              <span className="text-red-600">
                ⚠ Please provide a password with at least 8 characters.
              </span>
            )}

            <label className="font-medium text-gray-900">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder=""
              name="passwordConfirm"
              ref={register({
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className="my-4 shadow p-1 appearance-none text-xl border lg:px-4 lg:text-xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />
            {errors.passwordConfirm && (
              <span className="text-red-600">
                ⚠ Please provide the same password above
              </span>
            )}
            <input
              type="submit"
              className="md:inline bg-themeYellow mx-1 px-3 py-1 lg:mt-2 lg:ml-6 lg:mx-8 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
            />
          </form>
        </div>
        {/* Img */}
        <div className="lg:w-3/6 lg:flex">
          <img className="hidden lg:flex" src={imgSignup} alt="Rooms" />
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
