import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../components/styles.css";
import axios from "axios";

function ListingInfo(props) {
  const userLoggedID = localStorage.getItem("userID");

  let ownerData = props.owner || "";
  let updateAndDelete;
  if (ownerData[0].id === userLoggedID) {
    updateAndDelete = (
      <div>
        <Link to={`/listings/${props._id}`}>UPDATE</Link>
        <p>""</p>
        <Link to={`/delete/${props._id}`}>DELETE</Link>
      </div>
    );
  } else {
    updateAndDelete = "";
  }

  let pictures = "";
  if (props.pictures.length > 0) {
    pictures = props.pictures.map((el, index) => (
      <img
        key={index}
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.pictures[index]}`}
        alt="Listing"
      />
    ));
  }

  return (
    <div className="myCard">
      <div>
        {pictures}
        <p>{props.createdDate}</p>
        <p>{props._id}</p>
        <p>
          {typeof ownerData === "object" ? (
            <Link to={`/users/${ownerData[0].id}`}>
              Owner: {ownerData[0].name}
            </Link>
          ) : (
            `Owner: ""`
          )}
        </p>
        <p>{props.title}</p>
        <p>{props.type}</p>
        <p>{props.city}</p>
        <p>{props.state}</p>
        <p>{props.country}</p>
        <p>{props.zip}</p>
        <p>{props.utilitiesIncl ? "Utilities Included" : "NO Utilities"}</p>
        <p>{props.rent}</p>
        <p>{props.description}</p>
        <p>{props.availableDate}</p>
        <p>{props.petAllowed ? "Pet Allowed: yes" : " Pet Allowed: no"}</p>
        <p>{props.buildingType}</p>
        <p>{props.contactPhone}</p>
        <p>{props.contactEmail}</p>
        {updateAndDelete}
      </div>
    </div>
  );
}

function Listing({ match }) {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/api/listings/${match.params.id}`,
        });

        setData(response.data.data.listings);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch this particular Listings...🧐"
        );
      }
    };
    fetchListings();
  }, [match.params.id]);

  const result = data === "" ? "" : <ListingInfo {...data} />;
  return (
    <div>
      <h1>{`Listing ${match.params.id}:`}</h1>
      <div className="cardContainer">{result}</div>
    </div>
  );
}

export default Listing;
