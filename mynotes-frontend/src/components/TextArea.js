import React from "react";

function TextArea({
  componentStyle,
  icon,
  onChange,
  placegolderStyle,
  placeholderText,
}) {
  return (
    <div className={componentStyle}>
      <div className={placegolderStyle}>
        {icon}
        {placeholderText}
      </div>
      <textarea id={placeholderText} onChange={onChange} />
    </div>
  );
}

export default TextArea;
