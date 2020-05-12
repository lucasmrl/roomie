import React, { useState, useEffect, useContext } from "react";
import "./../components/styles.css";
import axios from "axios";

function UserProfile(props) {
  return (
    <div className="userProfile">
      <div>
        <p>{props.name}</p>
        <p>{props.email}</p>
        <p>{props.about}</p>
        <p>{props.about}</p>
        <p>{props.age}</p>
        <p>{props.college}</p>
      </div>
    </div>
  );
}

function UserListings(props) {
  return (
    <div className="userProfile">
      <div>
        <p>{props._id}</p>
        <p>{props.title}</p>
        <p>{props.city}</p>
        <p>{props.state}</p>
        <p>{props.country}</p>
        <p>{props.zip}</p>
        <p>{props.utilitiesIncl ? "Utilities Included" : "NO Utilities"}</p>
        <p>{props.rent}</p>
      </div>
    </div>
  );
}

function User() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/users/5eb24f8e4c713657506282de",
        });
        setData(response.data.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          return console.log("Please, sign in!");
        } else {
          return alert(
            "Something went wrong while trying to fetch this User...🧐"
          );
        }
      }
    };
    fetchUserProfile();
  }, []);

  const resultInfo = data === "" ? "" : <UserProfile {...data} />;
  const resultListings =
    data === ""
      ? ""
      : data.myListings.map((el) => <UserListings key={el._id} {...el} />);

  return (
    <div>
      <h1>User Profile: '5eb24f8e4c713657506282de':</h1>
      <h3>User:</h3>
      <div className="cardContainer">{resultInfo}</div>
      <h3>User's Listings:</h3>
      <div className="cardContainer">{resultListings}</div>
    </div>
  );
}

export default User;
