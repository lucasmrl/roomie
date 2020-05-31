import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function Logout(props) {
  const { setIsAuth } = useContext(AuthContext);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: '/api/users/logout',
        });
        //User will receive an invalid token as the response

        if (response.status === 200) {
          setIsAuth(false); // 1) When the user is redirected, the navbar will be updated
          localStorage.removeItem('isAuth'); // 2) Removing the information from localStorage
          localStorage.removeItem('userID');
          props.history.push('/'); // 3) Redirecting to the main page with the correct navbar
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
            Something went wrong!
          </SweetAlert>
        );
      }
    };
    logoutUser();
  }, [props, setIsAuth]);

  return (
    <div>
      {alert}
      <Redirect to="/" />
    </div>
  );
}

export default Logout;
