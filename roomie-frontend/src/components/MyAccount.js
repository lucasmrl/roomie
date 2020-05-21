import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function MyAccount() {
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const fetchUserData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/users/${userId}`,
        });

        setUserData(response.data.data.user);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch this particular User...🧐"
        );
      }
    };
    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data.profilePicture[0]);
    const formData = new FormData();

    if (data.name === "") data.name = userData.name;
    if (data.email === "") data.email = userData.email;
    if (
      typeof data.profilePicture[0] === "undefined" ||
      data.profilePicture[0] === "undefined"
    ) {
    } else {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("age", data.age);
    formData.set("college", data.college);
    formData.set("about", data.about);

    try {
      const response = await axios({
        method: "PATCH",
        url: "/api/users/updateMe",
        data: formData,
      });
      console.log(data);
      if (response.status === 200) {
        alert("It Worked!");
        //   props.history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      return alert("Problems!! ❌");
    }
  };

  let imageProfile;

  if (
    userData.profilePicture === "undefined" ||
    typeof userData.profilePicture === "undefined"
  ) {
    imageProfile = "";
  } else {
    imageProfile = (
      <img
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${userData.profilePicture}`}
        alt="User Profile"
      />
    );
  }

  return (
    <div>
      <h2>My Account:</h2>
      <Link to="/update-password">
        <h4>Update Password</h4>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Profile Picture:</label>
        {imageProfile}
        <input type="file" name="profilePicture" ref={register} />

        <label>Name:</label>
        <input
          type="text"
          placeholder={userData.name}
          name="name"
          ref={register}
        />

        <label>E-mail:</label>
        <input
          type="email"
          placeholder={userData.email}
          name="email"
          ref={register({ pattern: /^\S+@\S+$/i })}
        />

        <label>Age:</label>
        <input
          type="number"
          placeholder={userData.age}
          name="age"
          ref={register}
        />

        <label>College:</label>
        <input
          type="text"
          placeholder={userData.college}
          name="college"
          ref={register}
        />

        <label>About me:</label>
        <textarea name="about" placeholder={userData.about} ref={register} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default MyAccount;
