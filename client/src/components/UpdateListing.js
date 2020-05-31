import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function UpdateListing({ match }) {
  const { register, handleSubmit, errors } = useForm();
  const [listingData, setListingData] = useState({});
  const [alert, setAlert] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/listings/${match.params.id}`,
        });

        setListingData(response.data.data.listings);
      } catch (error) {
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
            customButtons={
              <React.Fragment>
                <input
                  onClick={setAlert(null)}
                  value="Try Again"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Problems to retrieve this listing. Please, try again later.
          </SweetAlert>
        );
      }
    };
    fetchListing();
  }, [match.params.id]);

  const onSubmit = async (data) => {
    setIsFetching(true);
    if (data.address === '') data.address = listingData.address;
    if (data.availableDate === '')
      data.availableDate = listingData.availableDate;
    if (data.city === '') data.city = listingData.city;
    if (data.contactEmail === '') data.contactEmail = listingData.contactEmail;
    if (data.contactPhone === '') data.contactPhone = listingData.contactPhone;
    if (data.country === '') data.country = listingData.country;
    if (data.description === '') data.description = listingData.description;
    if (data.rent === '') data.rent = listingData.rent;
    if (data.state === '') data.state = listingData.state;
    if (data.title === '') data.title = listingData.title;
    if (data.zip === '') data.zip = listingData.zip;

    const formData = new FormData();
    for (let dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }
    if (data.pictures0[0]) formData.append('pictures', data.pictures0[0]);
    if (data.pictures1[0]) formData.append('pictures', data.pictures1[0]);
    if (data.pictures2[0]) formData.append('pictures', data.pictures2[0]);

    try {
      const response = await axios({
        method: 'PATCH',
        url: `/api/listings/${match.params.id}`,
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
            Listing Updated.
          </SweetAlert>
        );
      }
    } catch (error) {
      if (error.response.status === 403) {
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
            Sorry, your are not authorized to make this update!
          </SweetAlert>
        );
      } else {
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
    }
  };

  let renderSelect;
  let renderBuldingType;
  let renderUtil;
  let petAllowed;

  if (Object.keys(listingData).length === 0) {
    renderSelect = '';
    renderBuldingType = '';
    renderUtil = '';
    petAllowed = '';
  } else {
    renderSelect = (
      <div>
        <label className="block font-bold text-gray-900 mt-3">Room:</label>
        <select
          name="type"
          defaultValue={listingData.type}
          ref={register}
          className="block my-2 text-xl"
        >
          <option value="shared">Shared</option>
          <option value="private">Private</option>
        </select>
      </div>
    );

    renderBuldingType = (
      <div>
        <label className="font-bold text-gray-900 mt-3">Building Type:</label>
        <select
          name="buildingType"
          defaultValue={listingData.buildingType}
          ref={register}
          className="block my-2 text-xl"
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
            className="inline ml-2"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="text-xl mx-1">Yes</label>

          <input
            className="inline ml-2 text-xl"
            name="utilitiesIncl"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="text-xl mx-1">No</label>
        </div>
      );
    } else {
      renderUtil = (
        <div>
          <input
            className="inline ml-2"
            name="utilitiesIncl"
            type="radio"
            value="true"
            ref={register}
          />
          <label className="text-xl mx-1">Yes</label>

          <input
            className="inline ml-2 text-xl"
            name="utilitiesIncl"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="text-xl mx-1">No</label>
        </div>
      );
    }

    if (listingData.petAllowed) {
      petAllowed = (
        <div>
          <input
            className="inline ml-2"
            name="petAllowed"
            type="radio"
            value="false"
            ref={register}
          />
          <label className="text-xl mx-1">No</label>

          <input
            className="inline ml-2 text-xl"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="true"
            ref={register}
          />
          <label className="text-xl mx-1">Yes</label>
        </div>
      );
    } else {
      petAllowed = (
        <div>
          <input
            className="inline ml-2"
            name="petAllowed"
            type="radio"
            defaultChecked
            value="false"
            ref={register}
          />
          <label className="text-xl mx-1">No</label>

          <input
            ref={register}
            className="inline ml-2 text-xl"
            name="petAllowed"
            type="radio"
            value="true"
          />
          <label className="text-xl mx-1">Yes</label>
        </div>
      );
    }
  }

  let pictures = '';
  if (listingData.pictures && listingData.pictures.length > 0) {
    pictures = listingData.pictures.map((el, index) => (
      <img
        key={index}
        className="w-32 sm:w-48 sm:w-64 lg:w-64 lg:h-64 shadow-sm lg:px-1 lg:object-center lg:object-cover"
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${listingData.pictures[index]}`}
        alt="Listing"
      />
    ));
  }

  return (
    <div className="flex flex-col lg:w-full">
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
      <div className="px-6 py-3 bg-orange-200">
        <h1 className="font-bold text-2xl text-gray-900">Update Listing</h1>
      </div>

      {/* Form */}
      <div className="flex flex-col p-6">
        <div className="flex py-2 sm:justify-around lg:px-6 lg:w-full lg:flex-grow lg:justify-start overflow-hidden">
          {pictures}
        </div>
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
            placeholder={listingData.title}
            name="title"
            ref={register}
            className="block my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline sm:w-full sm:flex-grow"
          />

          <div className="lg:flex lg:justify-start">
            <div>{renderSelect}</div>

            <div className="lg:mt-3 lg:ml-8">{renderBuldingType}</div>

            <div className="lg:ml-8">
              {' '}
              <label className="block font-bold text-gray-900 mt-3">
                Utilities Included?
              </label>
              {renderUtil}
            </div>

            <div className="lg:ml-8">
              {' '}
              <label className="block font-bold text-gray-900 mt-3">
                Pets Allowed?
              </label>
              {petAllowed}
            </div>
          </div>

          <label className="font-bold text-gray-900 mt-3">Rent:</label>
          <input
            type="number"
            placeholder={listingData.rent}
            name="rent"
            ref={register}
            className="block my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">Address:</label>
          <input
            type="text"
            placeholder={listingData.address}
            name="address"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">City:</label>
          <input
            type="text"
            placeholder={listingData.city}
            name="city"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">State:</label>
          <input
            type="text"
            placeholder={listingData.state}
            name="state"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">Zip:</label>
          <input
            type="number"
            placeholder={listingData.zip}
            name="zip"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">Country:</label>
          <input
            type="text"
            placeholder={listingData.country}
            name="country"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">
            Description about your space:
          </label>
          <textarea
            name="description"
            placeholder={listingData.description}
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <label className="block font-bold text-gray-900 mt-3">
            First Date Available:
          </label>
          <input
            type="date"
            placeholder={listingData.availableDate}
            name="availableDate"
            ref={register}
            className="my-2 shadow p-1 appearance-none text-xl border lg:text-xl lg:px-4 rounded-lg text-gray-700 focus:outline-none focus:shadow-outline md:w-full md:flex-grow"
          />

          <p className="font-bold text-gray-900 mt-4 text-xl">Contact:</p>
          <hr className="border-orange-300 mb-4" />

          <label className="block font-bold text-gray-900 mt-3">E-mail:</label>
          <input
            type="email"
            placeholder={listingData.contactEmail}
            name="contactEmail"
            ref={register({ required: false, pattern: /^\S+@\S+$/i })}
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
            placeholder={listingData.contactPhone}
            name="contactPhone"
            ref={register({ required: false, minLength: 6, maxLength: 12 })}
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

export default UpdateListing;
