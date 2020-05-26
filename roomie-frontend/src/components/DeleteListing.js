import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DeleteListing({ match }) {
  console.log(match);
  useEffect(() => {
    const deleteListing = async () => {
      try {
        // eslint-disable-next-line
        const response = await axios({
          method: "DELETE",
          url: `/api/listings/${match.params.id}`,
        });

        // if (response.status === 204) {
        //   props.history.push("/my-account");
        // }
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
      <h2 className="p-6 text-red-400 text-xl">Your Listing was deleted.</h2>
    </div>
  );
}

export default DeleteListing;
