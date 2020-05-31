import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import ListingCard from './ListingCard';

function MyAccount() {
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    const fetchUserData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/users/${userId}`,
        });

        setUserData(response.data.data.user);
      } catch (error) {
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
            customButtons={
              <React.Fragment>
                <input
                  onClick={() => window.location.reload(false)}
                  value="Try Again"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Problems to retrieve your information.
          </SweetAlert>
        );
      }
    };
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    setIsFetching(true);
    const formData = new FormData();

    if (
      typeof data.profilePicture[0] === 'undefined' ||
      data.profilePicture[0] === 'undefined'
    ) {
    } else {
      formData.append('profilePicture', data.profilePicture[0]);
    }

    if (data.name === '') data.name = userData.name;
    if (data.email === '') data.email = userData.email;
    if (data.age === '') data.age = userData.age;
    if (data.college === '') data.college = userData.college;
    if (data.about === '') data.about = userData.about;
    formData.set('name', data.name);
    formData.set('email', data.email);
    formData.set('age', data.age);
    formData.set('college', data.college);
    formData.set('about', data.about);

    try {
      const response = await axios({
        method: 'PATCH',
        url: '/api/users/updateMe',
        data: formData,
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
                  onClick={() => window.location.reload(false)}
                  value="Ok"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Your account was updated.
          </SweetAlert>
        );
      }
    } catch (error) {
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
  };

  let imageProfile;

  if (
    userData.profilePicture === 'undefined' ||
    typeof userData.profilePicture === 'undefined'
  ) {
    imageProfile = '';
  } else {
    imageProfile = (
      <img
        className="rounded-full h-40 w-40 shadow-sm"
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${userData.profilePicture}`}
        alt="User Profile"
      />
    );
  }

  const resultListings =
    userData.myListings === 'undefined' ||
    typeof userData.myListings === 'undefined'
      ? ''
      : userData.myListings.map((el) => (
          <div className="m-3">
            <ListingCard key={el._id} {...el} />
          </div>
        ));

  console.log(isFetching);
  return (
    <div className="flex flex-col w-full bg-gray-100 ">
      {alert}
      <div
        className={`${
          isFetching ? '' : 'hidden'
        } w-full bg-yellow-100 m-auto flex justify-center content-center items-center`}
      >
        <ReactLoading type="spin" color="#7BFFB7" height={70} width={70} />
        <p className="text-2xl text-teal-400 mx-4">Processing...</p>
      </div>
      {/* Header */}
      <div className="px-6 py-3 bg-yellow-200">
        <h2 className="font-bold text-2xl text-gray-900">My Account:</h2>
        <Link to="/update-password" className="font-sm text-red-400 font-light">
          <h4>Update Password</h4>
        </Link>
      </div>
      {/* Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:flex-row">
          <div className="px-6 py-3 flex flex-col md:w-1/4">
            {imageProfile}
            <label className="block mt-2 font-medium text-gray-800">
              Profile Picture:
            </label>
            <input
              type="file"
              className="my-2"
              name="profilePicture"
              ref={register}
            />
          </div>
          <div className="px-6 py-3 flex flex-col md:w-3/4">
            <label className="block font-medium text-gray-800">Name:</label>
            <input
              type="text"
              placeholder={userData.name}
              name="name"
              ref={register}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <label className="block font-medium text-gray-800">E-mail:</label>
            <input
              type="email"
              placeholder={userData.email}
              name="email"
              ref={register({ pattern: /^\S+@\S+$/i })}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <label className="block font-medium text-gray-800">Age:</label>
            <input
              type="number"
              placeholder={userData.age}
              name="age"
              ref={register}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <label className="block font-medium text-gray-800">College:</label>
            <input
              type="text"
              placeholder={userData.college}
              name="college"
              ref={register}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <label className="block font-medium text-gray-800">About me:</label>
            <textarea
              name="about"
              placeholder={userData.about}
              ref={register}
              className="my-2 shadow p-3 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
            />

            <input
              type="submit"
              className="block bg-themeYellow mx-1 px-3 lg:mt-2 py-1 lg:m-0 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow lg:w-64"
            />
          </div>
        </div>
      </form>
      <div className="flex flex-col w-full bg-gray-100 ">
        <div className="px-6 py-3">
          <h2 className="font-bold text-2xl text-gray-900">My Listings:</h2>
        </div>
        <div className="w-64 md:flex md:w-full md:flex-wrap">
          {resultListings}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
