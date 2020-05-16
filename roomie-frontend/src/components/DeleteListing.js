import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DeleteListing({ match }) {
  useEffect(() => {
    const deleteListing = async () => {
      try {
        // eslint-disable-next-line
        const response = await axios({
          method: "DELETE",
          url: `/api/listings/${match.params.id}`,
        });
      } catch (error) {
        return alert(
          "Something went wrong while trying to delete this Listing...🧐"
        );
      }
    };
    deleteListing();
  }, [match.params.id]);

  return (
    <div>
      <h2>Your Listing was deleted.</h2>
      <ul>
        <li>
          <Link to={`/my-account`}>Go to My Account</Link>
        </li>
        <li>
          <Link to={`/listings`}>Se All Listings</Link>
        </li>
      </ul>
    </div>
  );
}

export default DeleteListing;
