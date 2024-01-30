import React from "react";

function Link({ onClick, text }) {
  return (
    <span className="link" onClick={onClick}>
      {text}
    </span>
  );
}

export default Link;
