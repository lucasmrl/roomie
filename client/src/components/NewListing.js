import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function NewListing() {
  const { register, handleSubmit, errors } = useForm();
  const [alert, setAlert] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data) => {
    setIsFetching(true);
    const upperCaseCity = data.city
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    data.city = upperCaseCity;
    const addressToGeo = `${data.address},${data.state},${data.zip}`;
    const formData = new FormData();

    for (let dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }

    formData.append('pictures', data.pictures0[0]);
    formData.append('pictures', data.pictures1[0]);
    formData.append('pictures', data.pictures2[0]);

    // 1) Create query based on ADDRESS, STATE, ZIPCODE
    // 2) Linked AXIOS REQUEST:
    // ---> 2.a) GET request to backend to retrieve latitude, longitute [ ] Create Backend route to support this
    // ---> 2.b) Add the result to the fomrData object and send to POST request to create the listing
    try {
      const responseGeo = await axios({
        method: 'GET',
        url: `/api/listings/location/getGeo/${addressToGeo}`,
      });

      formData.append('latitude', responseGeo.data.data.latitude);
      formData.append('longitude', responseGeo.data.data.longitude);

      const response = await axios({
        method: 'POST',
        url: '/api/listings',
        data: formData,
      });

      if (response.status === 201) {
        setIsFetching(false);
        setAlert(
          <SweetAlert
            success
            title="Yay!"
            customButtons={
              <React.Fragment>
                <input
                  onClick={() =>
                    setAlert(
                      <Redirect
                        to={`/listing/${response.data.data.listing._id}`}
                      />
                    )
                  }
                  value="View Listing"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Listing created!
          </SweetAlert>
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
  return (
    <div className="flex flex-col">
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
      <div className="px-6 py-3 bg-themeGreen">
        <h1 className="font-bold text-2xl text-gray-900">New Listing</h1>
      </div>
      {/* Form */}
      <div className="flex flex-col p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold text-gray-900 mt-3">Images:</label>
          <input
            type="file"
            name="pictures0"
            ref={register}
            className="block border-4 border-dotted my-2"
          />
          <input
            type="file"
            name="pictures1"
            ref={register}
            className="block border-4 border-dotted my-2"
          />
          <input
            type="file"
            name="pictures2"
            ref={register}
            className="block border-4 border-dotted my-2"
          />

          <p className="font-bold text-gray-900 mt-4 text-xl">
            Listing Information:
          </p>
          <hr className="border-orange-300 mb-4" />

          <label className="font-bold text-gray-900 mt-3">Title:</label>
          <input
            type="text"
            placeholder=""
            name="title"
            ref={register({ required: true, maxLength: 80 })}
            className="block my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline sm:w-full sm:flex-grow"
          />
          {errors.title && (
            <span className="my-2 text-red-600">Please provide a Title.</span>
          )}

          <div className="lg:flex lg:justify-start">
            <div>
              <label className="block font-bold text-gray-900 mt-3">
                Room:
              </label>
              <select
                name="type"
                ref={register({ required: true })}
                className="block my-2 text-xl"
              >
                <option value="shared">Shared</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="lg:mt-3 lg:ml-8">
              <label className="font-bold text-gray-900 mt-3">
                Building Type:
              </label>
              <select
                name="buildingType"
                ref={register({ required: true })}
                className="block my-2 text-xl"
              >
                <option value="home">Home</option>
                <option value="basement">Basement</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhome">Townhome</option>
              </select>
            </div>

            <div className="lg:ml-8">
              <label className="block font-bold text-gray-900 mt-3">
                Utilities Included?
              </label>
              <input
                className="inline ml-2"
                name="utilitiesIncl"
                type="radio"
                value="true"
                ref={register({ required: true })}
              />
              <label className="text-xl mx-1">Yes</label>

              <input
                className="inline ml-2 text-xl"
                name="utilitiesIncl"
                type="radio"
                value="false"
                ref={register({ required: true })}
              />
              <label className="text-xl mx-1">No</label>
              {errors.utilitiesIncl && (
                <span className="block my-2 text-red-600">
                  Please inform if the utilities are included.
                </span>
              )}
            </div>
            <div className="lg:ml-8">
              <label className="block font-bold text-gray-900 mt-3">
                Pets Allowed?
              </label>
              <input
                className="inline ml-2"
                name="petAllowed"
                type="radio"
                value="false"
                ref={register({ required: true })}
              />
              <label className="text-xl mx-1">No</label>
              <input
                className="inline ml-2 text-xl"
                name="petAllowed"
                type="radio"
                value="true"
                ref={register({ required: true })}
              />
              <label className="text-xl mx-1">Yes</label>
              {errors.petAllowed && (
                <span className="block my-2 text-red-600">
                  Please inform if Pets are allowed.
                </span>
              )}
            </div>
          </div>

          <label className="font-bold text-gray-900 mt-3">Rent:</label>
          <input
            type="number"
            placeholder="$"
            name="rent"
            ref={register({ required: true })}
            className="block my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.rent && (
            <span className="my-2 text-red-600">Please provide the Rent.</span>
          )}

          <label className="block font-bold text-gray-900 mt-3">Address:</label>
          <input
            type="text"
            placeholder=""
            name="address"
            ref={register({ required: true })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.address && (
            <span className="my-2 text-red-600">Please provide a Address.</span>
          )}
          <label className="block font-bold text-gray-900 mt-3">City:</label>
          <input
            type="text"
            placeholder=""
            name="city"
            ref={register({ required: true })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.city && (
            <span className="my-2 text-red-600">Please provide a City.</span>
          )}
          <label className="block font-bold text-gray-900 mt-3">State:</label>
          <input
            type="text"
            placeholder="XX"
            name="state"
            ref={register({ required: true, maxLength: 2 })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.state && (
            <span className="my-2 text-red-600">Please provide a State.</span>
          )}
          <label className="block font-bold text-gray-900 mt-3">Zip:</label>
          <input
            type="number"
            placeholder="XXXXX"
            name="zip"
            ref={register({ required: true, maxLength: 5 })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.zip && (
            <span className="my-2 text-red-600">Please provide a Zip.</span>
          )}
          <label className="block font-bold text-gray-900 mt-3">Country:</label>
          <input
            type="text"
            placeholder=""
            name="country"
            ref={register({ required: true })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.country && (
            <span className="my-2 text-red-600">Please provide a Country.</span>
          )}
          <label className="block font-bold text-gray-900 mt-3">
            Description about your space:
          </label>
          <textarea
            name="description"
            ref={register({ required: true })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.description && (
            <span className="my-2 text-red-600">
              Please provide a Description.
            </span>
          )}
          <label className="block font-bold text-gray-900 mt-3">
            First Date Available:
          </label>
          <input
            type="date"
            placeholder="Available Date"
            name="availableDate"
            ref={register({ required: true })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.availableDate && (
            <span className="my-2 text-red-600">
              Please provide the first available date.
            </span>
          )}

          <p className="font-bold text-gray-900 mt-4 text-xl">Contact:</p>
          <hr className="border-orange-300 mb-4" />

          <label className="block font-bold text-gray-900 mt-3">E-mail:</label>
          <input
            type="email"
            placeholder="email@email.com"
            name="contactEmail"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.contactEmail && (
            <span className="my-2 text-red-600">
              Please provide a e-mail for contact.
            </span>
          )}
          <label className="block font-bold text-gray-900 mt-3">Phone:</label>
          <input
            type="tel"
            placeholder="(XXX) XXX - XXXX"
            name="contactPhone"
            ref={register({ required: true, minLength: 6, maxLength: 12 })}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />
          {errors.contactPhone && (
            <span className="my-2 text-red-600">
              Please provide a contact phone.
            </span>
          )}
          <input
            type="submit"
            className="block my-2 md:inline bg-themeYellow mx-1 px-3 lg:mt-6 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
          />
        </form>
      </div>
    </div>
  );
}

export default NewListing;
