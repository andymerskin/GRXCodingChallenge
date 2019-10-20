import React, { useState } from "react";
import "./FilterInput.scss";

function FilterInput({ onChange }) {
  const [input, setInput] = useState("");

  const textInput = React.createRef();

  function handleChange(value) {
    setInput(value);
    onChange(value);
  }

  function handleClear() {
    handleChange("");
    textInput.current.focus();
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      //esc
      handleClear();
    }
  }

  return (
    <div className="FilterInput pr-3">
      <input
        type="text"
        name="textInput"
        id="textInput"
        placeholder="Filter items"
        className="p-3"
        value={input}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
        ref={textInput}
      />
      {input.length > 0 && (
        <button className="link" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
}

export default FilterInput;
