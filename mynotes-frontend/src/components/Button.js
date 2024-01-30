import React from "react";

function Button({ componentStyle, icon, lableStyle, onClick, title, type }) {
  return (
    <button className={componentStyle} onClick={onClick} type={type}>
      <div className={lableStyle}>
        {icon}
        {title}
      </div>
    </button>
  );
}

export default Button;
