import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function NewListing() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const upperCaseCity = data.city
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    data.city = upperCaseCity;
    const addressToGeo = `${data.address},${data.state},${data.zip}`;
    const formData = new FormData();

    for (let dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }

    formData.append("pictures", data.pictures0[0]);
    formData.append("pictures", data.pictures1[0]);
    formData.append("pictures", data.pictures2[0]);

    // 1) Create query based on ADDRESS, STATE, ZIPCODE
    // 2) Linked AXIOS REQUEST:
    // ---> 2.a) GET request to backend to retrieve latitude, longitute [ ] Create Backend route to support this
    // ---> 2.b) Add the result to the fomrData object and send to POST request to create the listing
    try {
      const responseGeo = await axios({
        method: "GET",
        url: `/api/listings/location/getGeo/${addressToGeo}`,
      });

      formData.append("latitude", responseGeo.data.data.latitude);
      formData.append("longitude", responseGeo.data.data.longitude);

      const response = await axios({
        method: "POST",
        url: "/api/listings",
        data: formData,
      });

      if (response.status === 201) {
        alert("It Worked!");
        //   props.history.push("/");
      }
    } catch (error) {
      console.log(formData);
      console.log(error.response.data.message);
      return alert("Problems!! ❌");
    }
  };
  return (
    <div>
      <h2>New Listing:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Images:</label>
        <input type="file" name="pictures0" ref={register} />
        <input type="file" name="pictures1" ref={register} />
        <input type="file" name="pictures2" ref={register} />

        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          ref={register({ required: true, maxLength: 80 })}
        />
        {errors.title && <span>Please provide a Title.</span>}
        <label>Room:</label>
        <select name="type" ref={register({ required: true })}>
          <option value="shared">Shared</option>
          <option value="private">Private</option>
        </select>
        <label>Building Type:</label>
        <select name="buildingType" ref={register({ required: true })}>
          <option value="home">Home</option>
          <option value="basement">Basement</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
        </select>
        <label>Rent:</label>
        <input
          type="number"
          placeholder="Value"
          name="rent"
          ref={register({ required: true })}
        />
        {errors.rent && <span>Please provide the Rent.</span>}
        <label>Utilities Included?:</label>
        <input
          className="radio"
          name="utilitiesIncl"
          type="radio"
          value="true"
          ref={register({ required: true })}
        />
        <label className="radio">Yes</label>

        <input
          className="radio"
          name="utilitiesIncl"
          type="radio"
          value="false"
          ref={register({ required: true })}
        />
        <label className="radio">No</label>
        {errors.utilitiesIncl && (
          <span>Please inform if the utilities are included.</span>
        )}

        <label>Address:</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          ref={register({ required: true })}
        />
        {errors.address && <span>Please provide a Address.</span>}
        <label>City:</label>
        <input
          type="text"
          placeholder="City"
          name="city"
          ref={register({ required: true })}
        />
        {errors.city && <span>Please provide a City.</span>}
        <label>State:</label>
        <input
          type="text"
          placeholder="State"
          name="state"
          ref={register({ required: true, maxLength: 2 })}
        />
        {errors.state && <span>Please provide a State.</span>}
        <label>Zip:</label>
        <input
          type="number"
          placeholder="Zipcode"
          name="zip"
          ref={register({ required: true, maxLength: 5 })}
        />
        {errors.zip && <span>Please provide a Zip.</span>}
        <label>Country:</label>
        <input
          type="text"
          placeholder="Country"
          name="country"
          ref={register({ required: true })}
        />
        {errors.country && <span>Please provide a Country.</span>}
        <label>Description about your space:</label>
        <textarea name="description" ref={register({ required: true })} />
        {errors.description && <span>Please provide a Description.</span>}
        <label>First Date Available:</label>
        <input
          type="date"
          placeholder="Available Date"
          name="availableDate"
          ref={register({ required: true })}
        />
        {errors.availableDate && (
          <span>Please provide the first available date.</span>
        )}
        <label>Pets Allowed?</label>
        <input
          className="radio"
          name="petAllowed"
          type="radio"
          value="false"
          ref={register({ required: true })}
        />
        <label className="radio">No</label>
        <input
          className="radio"
          name="petAllowed"
          type="radio"
          value="true"
          ref={register({ required: true })}
        />
        <label className="radio">Yes</label>
        {errors.petAllowed && <span>Please inform if Pets are allowed.</span>}
        <label>Contact E-mail:</label>
        <input
          type="email"
          placeholder="Email"
          name="contactEmail"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.contactEmail && (
          <span>Please provide a e-mail for contact.</span>
        )}
        <label>Contact Phone:</label>
        <input
          type="tel"
          placeholder="Mobile number"
          name="contactPhone"
          ref={register({ required: true, minLength: 6, maxLength: 12 })}
        />
        {errors.contactPhone && <span>Please provide a contact phone.</span>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewListing;
