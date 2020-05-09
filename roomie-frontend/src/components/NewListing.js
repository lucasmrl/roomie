import React, { useState } from "react";
import axios from "axios";

function NewListing() {
  const [data, setData] = useState({
    title: "",
    type: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    utilitiesIncl: "",
    rent: "",
    description: "",
    availableDate: "",
    petAllowed: "",
    buildingType: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api//listings",
        data,
      });

      if (response.status === 201) {
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
      <form onSubmit={handleSubmit}>
        <h1>New Listing:</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={data.state}
          onChange={(e) => setData({ ...data, state: e.target.value })}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={data.country}
          onChange={(e) => setData({ ...data, country: e.target.value })}
          required
        />

        <input
          type="text"
          name="zip"
          placeholder="ZipCode"
          value={data.zip}
          onChange={(e) => setData({ ...data, zip: e.target.value })}
          required
        />

        <input
          type="text"
          name="utilitiesIncl"
          placeholder="Utilities Included?"
          value={data.utilitiesIncl}
          onChange={(e) => setData({ ...data, utilitiesIncl: e.target.value })}
          required
        />

        <input
          type="text"
          name="rent"
          placeholder="Monthly Rent"
          value={data.rent}
          onChange={(e) => setData({ ...data, rent: e.target.value })}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
        />
        <input
          type="text"
          name="availableDate"
          placeholder="Available Date"
          value={data.availableDate}
          onChange={(e) => setData({ ...data, availableDate: e.target.value })}
          required
        />

        <input
          type="text"
          name="petAllowed"
          placeholder="Pets Allowed?"
          value={data.petAllowed}
          onChange={(e) => setData({ ...data, petAllowed: e.target.value })}
          required
        />

        <input
          type="text"
          name="buildingType"
          placeholder="Building Type"
          value={data.buildingType}
          onChange={(e) => setData({ ...data, buildingType: e.target.value })}
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Enter email:"
          value={data.contactEmail}
          onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
          required
        />
        <input
          type="text"
          name="contactPhone"
          placeholder="Phone"
          value={data.contactPhone}
          onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default NewListing;
