import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

function DeleteListing({ match }) {
  const [alert, setAlert] = useState("");
  useEffect(() => {
    const deleteListing = async () => {
      try {
        // eslint-disable-next-line
        const response = await axios({
          method: "DELETE",
          url: `/api/listings/${match.params.id}`,
        });

        return setAlert(
          <SweetAlert
            danger
            title="Listing Deleted."
            customButtons={
              <React.Fragment>
                <input
                  onClick={() => setAlert(<Redirect to={`/my-account`} />)}
                  value="Ok"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          ></SweetAlert>
        );
      } catch (error) {
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
            customButtons={
              <React.Fragment>
                <input
                  onClick={() => window.location.reload(false)}
                  value="Try Again"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Problems to delete this listing. Please, try again later.
          </SweetAlert>
        );
      }
    };
    deleteListing();
  }, [match.params.id]);

  return <div>{alert}</div>;
}

export default DeleteListing;
