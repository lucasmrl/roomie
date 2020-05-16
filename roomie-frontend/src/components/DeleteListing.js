import React, { useEffect } from "react";
import axios from "axios";

function DeleteListing({ match }) {
  useEffect(() => {
    const deleteListing = async () => {
      try {
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
  }, []);

  return (
    <div>
      <h2>Your Listing was deleted.</h2>
    </div>
  );
}

export default DeleteListing;
