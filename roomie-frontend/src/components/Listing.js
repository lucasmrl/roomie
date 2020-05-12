import React, { useState, useEffect, useContext } from "react";
import "./../components/styles.css";
import axios from "axios";

function ListingInfo(props) {
  let ownerData = props.owner || "";
  return (
    <div className="myCard">
      <div>
        <p>{props.createdDate}</p>
        <p>{props._id}</p>
        <p>
          {typeof ownerData === "object"
            ? `Owner: ${ownerData[0].name}`
            : `Owner: ""`}
        </p>
        <p>{props.title}</p>
        <p>{props.type}</p>
        <p>{props.city}</p>
        <p>{props.state}</p>
        <p>{props.country}</p>
        <p>{props.zip}</p>
        <p>{props.utilitiesIncl}</p>
        <p>{props.utilitiesIncl ? "Utilities Included" : "NO Utilities"}</p>
        <p>{props.rent}</p>
        <p>{props.description}</p>
        <p>{props.availableDate}</p>
        <p>{props.petAllowed ? "Pet Allowed: yes" : " Pet Allowed: no"}</p>
        <p>{props.buildingType}</p>
        <p>{props.contactPhone}</p>
        <p>{props.contactEmail}</p>
      </div>
    </div>
  );
}

function Listing() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/listings/5eba1d81fe50bb183267359e",
        });

        setData(response.data.data.listings);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch this particular Listings...🧐"
        );
      }
    };
    fetchListings();
  }, []);

  const result = data === "" ? "" : <ListingInfo {...data} />;
  return (
    <div>
      <h1>Listing '5eba1d81fe50bb183267359e':</h1>
      <div className="cardContainer">{result}</div>
    </div>
  );
}

export default Listing;
