import React from "react";

function Input({
  componentStyle,
  icon,
  onChange,
  disabled,
  name,
  placeholderStyle,
  placeholderText,
  type,
  value,
}) {
  return (
    <div className={componentStyle}>
      <div className={placeholderStyle}>
        {icon}
        {placeholderText}
      </div>
      <input
        autoComplete="off"
        disabled={disabled}
        id={placeholderText}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
}

export default Input;
