import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import ListingCard from './ListingCard';

function UserProfile(props) {
  let imageProfile;
  if (
    props.profilePicture === 'undefined' ||
    typeof props.profilePicture === 'undefined'
  ) {
    imageProfile = '';
  } else {
    imageProfile = (
      <img
        className="rounded-full h-40 w-40 shadow-sm"
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.profilePicture}`}
        alt="User Profile"
      />
    );
  }

  return (
    <div>
      <div className="text-gray-800">
        <div className="flex items-center justify-center">{imageProfile}</div>
        <div className="pt-2 px-4">
          <p className="font-bold mb-2 text-xl py-4">{props.name}</p>
          <p className="font-medium">
            <span className="font-bold">E-mail: </span>
            {props.email}
          </p>
          <p>
            {props.age === null ? (
              ''
            ) : (
              <div>
                <span className="font-bold">Age: </span>
                {props.age}
              </div>
            )}
          </p>
          <p>
            {props.college === '' ? (
              ''
            ) : (
              <div>
                <span className="font-bold">College: </span>
                {props.college}
              </div>
            )}
          </p>
          <p>
            {props.about === '' ? (
              ''
            ) : (
              <div>
                <span className="font-bold">About me: </span>
                {props.about}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function User({ match }) {
  const [data, setData] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/users/${match.params.id}`,
        });
        setData(response.data.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          return setAlert(
            <SweetAlert
              danger
              title="Woot!"
              customButtons={
                <React.Fragment>
                  <input
                    onClick={() => setAlert(<Redirect to={`/login`} />)}
                    value="Ok"
                    type="submit"
                    className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                  />
                </React.Fragment>
              }
            >
              Please, sign in.
            </SweetAlert>
          );
        } else {
          return setAlert(
            <SweetAlert
              danger
              title="Woot!"
              customButtons={
                <React.Fragment>
                  <input
                    onClick={() => setAlert(<Redirect to={`/listings`} />)}
                    value="Ok"
                    type="submit"
                    className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                  />
                </React.Fragment>
              }
            >
              Problems to retrieve this user's information.
            </SweetAlert>
          );
        }
      }
    };
    fetchUserProfile();
  }, [match.params.id]);

  const userName = data.name ? `${data.name}'s Listings` : '';
  const resultInfo = data === '' ? '' : <UserProfile {...data} />;
  const resultListings =
    data === ''
      ? ''
      : data.myListings.map((el) => <ListingCard key={el._id} {...el} />);

  return (
    <div className="flex flex-col items-center bg-gray-100 sm:flex-row sm:items-start">
      {alert}
      <div className="sm:p-6 md:w-1/4">
        <h3 className="font-bold text-2xl text-gray-800 justify-center text-center">
          Profile:
        </h3>
        <div className="flex items-center my-4">{resultInfo}</div>
      </div>
      <div className="sm:p-6 md:w-3/4">
        <h3 className="font-bold text-2xl text-gray-800">{userName}</h3>
        <div className="w-64 md:flex md:w-auto md:flex-wrap">
          {resultListings}
        </div>
      </div>
    </div>
  );
}

export default User;
