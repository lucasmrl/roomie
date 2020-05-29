import React from "react";

function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center w-full flex-grow bg-gray-100 text-gray-800">
      <h2 className="font-bold text-6xl">404.</h2>
      <h3 className="font-base">
        Sorry, page not found.
        <span role="img" aria-label="sad face">
          😢
        </span>
      </h3>
    </div>
  );
}

export default NotFound;
