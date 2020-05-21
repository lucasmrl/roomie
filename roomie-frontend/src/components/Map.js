import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import "./../components/styles.css";

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

    console.log(latitudeCenter, longitudeCenter);

    // latitudeCenter = props.listingsInfo[0].latitude;
    // longitudeCenter = props.listingsInfo[0].longitude;
  }

  return (
    <Map center={[latitudeCenter, longitudeCenter]} zoom={10}>
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
          <div>
            <h2>{activeListing.title}</h2>
            <p>{activeListing.rent}</p>
            <Link to={`/listing/${activeListing._id}`}>View Listing</Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}
