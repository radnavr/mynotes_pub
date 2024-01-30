import React, { useEffect, useState } from "react";

function Loader() {
  const [isDelay, setIsDelay] = useState("");
  const handleIsDelayChange = () => setIsDelay("loading...");

  useEffect(() => {
    setTimeout(() => {
      handleIsDelayChange();
    }, 2000);
  });
  return (
    <div className="loader-container">
      <p className="text-centered">{isDelay}</p>
    </div>
  );
}

export default Loader;
