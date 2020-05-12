import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./styles.css";

function MyAccount() {
  const { register, handleSubmit, errors } = useForm();
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
    if (data.name === "") data.name = userData.name;
    if (data.contactEmail === "") data.contactEmail = userData.email;
    if (data.age === "") data.age = userData.age;
    if (data.college === "") data.college = userData.college;
    if (data.about === "") data.about = userData.about;

    try {
      const response = await axios({
        method: "PATCH",
        url: "/api/users/updateMe",
        data,
      });

      if (response.status === 200) {
        alert("It Worked!");
        //   props.history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      return alert("Problems!! ❌");
    }
  };

  return (
    <div>
      <h2>My Account:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          name="contactEmail"
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
