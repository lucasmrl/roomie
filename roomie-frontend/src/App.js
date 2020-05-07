import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/listings");

      setData(result.data.data.listings);
    };

    fetchData();
  }, []);

  const listings = data.map((el) => <p key={el._id}>{el._id}</p>);

  return (
    <div>
      <p>All Listings:</p>
      {listings}
    </div>
  );
}

export default App;
