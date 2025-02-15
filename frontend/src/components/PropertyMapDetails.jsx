import React from "react";
import PropertyMap from "./PropertyMap"; // Import the map component

const PropertyDetails = ({ property }) => {
  return (
    <div>
      {/* <h2>{property.name}</h2>
      <p>{property.address}</p> */}

      {/* Pass Latitude & Longitude to the Map */}
      <PropertyMap latitude={property.location.latitude} longitude={property.location.longitude} />
    </div>
  );
};

export default PropertyDetails;
