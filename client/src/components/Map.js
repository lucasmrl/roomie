import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './styles.css';

export default function MyMap(props) {
  const [activeListing, setActiveListing] = useState(null);

  let listingsToUse = [];
  let latitudeCenter = 0;
  let longitudeCenter = 0;
  if (props.listingsInfo.length > 0) {
    listingsToUse = props.listingsInfo;
    //Perform calculation based in all latitudes and longitudes to get the in between value

    let allLatitudes = props.listingsInfo.map((el) => el.latitude);
    let allLongitudes = props.listingsInfo.map((el) => el.longitude);
    latitudeCenter =
      allLatitudes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) / props.listingsInfo.length;

    longitudeCenter =
      allLongitudes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) / props.listingsInfo.length;
  }

  return (
    <Map center={[latitudeCenter, longitudeCenter]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {listingsToUse.map((el) => (
        <Marker
          key={el._id}
          position={[el.latitude, el.longitude]}
          onClick={() => {
            setActiveListing(el);
          }}
        />
      ))}

      {activeListing && (
        <Popup
          position={[activeListing.latitude, activeListing.longitude]}
          onClose={() => {
            setActiveListing(null);
          }}
        >
          <div className="leading-tight">
            <img
              className="w-20"
              src={`https://roomie-profile-pictures.s3.amazonaws.com/${activeListing.pictures[0]}`}
              alt="Listing"
            />
            <h2 className="text-xl text-gray-900 font-bold">
              {activeListing.title}
            </h2>
            <p className="text-xl font-medium text-gray-700">
              ${activeListing.rent}
              <span className="text-sm">/month</span>
            </p>
            <Link to={`/listing/${activeListing._id}`}>View Listing</Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}
