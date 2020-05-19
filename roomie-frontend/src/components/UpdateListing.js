import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./styles.css";

function UpdateListing({ match }) {
  const { register, handleSubmit, errors } = useForm();
  const [listingData, setListingData] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/listings/${match.params.id}`,
        });

        setListingData(response.data.data.listings);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch this particular Listing...🧐"
        );
      }
    };
    fetchListing();
  }, [match.params.id]);

  const onSubmit = async (data) => {
    if (data.address === "") data.address = listingData.address;
    if (data.availableDate === "")
      data.availableDate = listingData.availableDate;
    if (data.city === "") data.city = listingData.city;
    if (data.contactEmail === "") data.contactEmail = listingData.contactEmail;
    if (data.contactPhone === "") data.contactPhone = listingData.contactPhone;
    if (data.country === "") data.country = listingData.country;
    if (data.description === "") data.description = listingData.description;
    if (data.rent === "") data.rent = listingData.rent;
    if (data.state === "") data.state = listingData.state;
    if (data.title === "") data.title = listingData.title;
    if (data.zip === "") data.zip = listingData.zip;

    const formData = new FormData();
    for (let dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }
    if (data.pictures0[0]) formData.append("pictures", data.pictures0[0]);
    if (data.pictures1[0]) formData.append("pictures", data.pictures1[0]);
    if (data.pictures2[0]) formData.append("pictures", data.pictures2[0]);

    try {
      const response = await axios({
        method: "PATCH",
        url: `/api/listings/${match.params.id}`,
        data: formData,
      });

      if (response.status === 200) {
        alert("It Worked!");
        //   props.history.push("/");
      }
    } catch (error) {
      if (error.response.status === 403) {
        return alert("Sorry, your are not authorized to make this update!");
      } else {
        return alert("Sorry, We couldn't update your listing! ❌");
      }
    }
  };

  let renderSelect;
  let renderBuldingType;
  let renderUtil;
  let petAllowed;

  if (Object.keys(listingData).length === 0) {
    renderSelect = "";
    renderBuldingType = "";
    renderUtil = "";
    petAllowed = "";
  } else {
    renderSelect = (
      <div>
        <label>Room:</label>
        <select name="type" defaultValue={listingData.type} ref={register}>
          <option value="shared">Shared</option>
          <option value="private">Private</option>
        </select>
      </div>
    );

    renderBuldingType = (
      <div>
        {" "}
        <label>Building Type:</label>
        <select
          name="buildingType"
          defaultValue={listingData.buildingType}
          ref={register}
        >
          <option value="home">Home</option>
          <option value="basement">Basement</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
        </select>
      </div>
    );

    if (listingData.utilitiesIncl) {
      renderUtil = (
        <div>
          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>

          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="radio">No</label>
        </div>
      );
    } else {
      renderUtil = (
        <div>
          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>

          <input
            className="radio"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="radio">No</label>
        </div>
      );
    }

    if (listingData.petAllowed) {
      petAllowed = (
        <div>
          <input
            className="radio"
            name="petAllowed"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="radio">No</label>

          <input
            className="radio"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>
        </div>
      );
    } else {
      petAllowed = (
        <div>
          <input
            className="radio"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="radio">No</label>

          <input
            className="radio"
            name="petAllowed"
            type="radio"
            value="true"
            ref={register}
          />
          <label className="radio">Yes</label>
        </div>
      );
    }
  }

  let pictures = "";
  if (listingData.pictures && listingData.pictures.length > 0) {
    pictures = listingData.pictures.map((el, index) => (
      <img
        key={index}
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${listingData.pictures[index]}`}
        alt="Listing"
      />
    ));
  }

  return (
    <div>
      <h2>{`Update Listing ${match.params.id}:`}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {pictures}
        <label>Images:</label>
        <input type="file" name="pictures0" ref={register} />
        <input type="file" name="pictures1" ref={register} />
        <input type="file" name="pictures2" ref={register} />
        <label>Title:</label>
        <input
          type="text"
          placeholder={listingData.title}
          name="title"
          ref={register}
        />

        {renderSelect}
        {renderBuldingType}

        <label>Rent:</label>
        <input
          type="number"
          placeholder={listingData.rent}
          name="rent"
          ref={register}
        />

        <label>Utilities Included?:</label>
        {renderUtil}

        <label>Address:</label>
        <input
          type="text"
          placeholder={listingData.address}
          name="address"
          ref={register}
        />

        <label>City:</label>
        <input
          type="text"
          placeholder={listingData.city}
          name="city"
          ref={register}
        />

        <label>State:</label>
        <input
          type="text"
          placeholder={listingData.state}
          name="state"
          ref={register}
        />

        <label>Zip:</label>
        <input
          type="number"
          placeholder={listingData.zip}
          name="zip"
          ref={register}
        />

        <label>Country:</label>
        <input
          type="text"
          placeholder={listingData.country}
          name="country"
          ref={register}
        />

        <label>Description about your space:</label>
        <textarea
          name="description"
          placeholder={listingData.description}
          ref={register}
        />

        <label>First Date Available:</label>
        <input
          type="datetime"
          placeholder={listingData.availableDate}
          name="availableDate"
          ref={register}
        />

        <label>Pets Allowed?</label>
        {petAllowed}

        <label>Contact E-mail:</label>
        <input
          type="email"
          placeholder={listingData.contactEmail}
          name="contactEmail"
          ref={register({ pattern: /^\S+@\S+$/i })}
        />
        {errors.contactEmail && (
          <span>Please provide a valid e-mail for contact.</span>
        )}

        <label>Contact Phone:</label>
        <input
          type="tel"
          placeholder={listingData.contactPhone}
          name="contactPhone"
          ref={register}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default UpdateListing;
