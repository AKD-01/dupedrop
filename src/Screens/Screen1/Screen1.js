// Import necessary modules from React and react-router-dom libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Screen1.css";

// Define functional component Screen1
const Screen1 = () => {
// Define input state value as empty string using useState hook
const [inputValue, setInputValue] = useState("");

// Define navigate function for routing to next component using useNavigate hook from react-router-dom
const navigate = useNavigate();

// Function that handles changes in input box and sets the value of inputValue accordingly
const handleInputChange = (event) => {
setInputValue(event.target.value);
};

// Function that executes when the form is submitted by the user
const handleSubmit = (event) => {
event.preventDefault();

   // Handle the case where user tries to submit an empty input field
if (inputValue === "") {
    alert("Please Enter some value!");
    return;
  }
  
  // Navigate to next component with entered value passed as props
  else {
    console.log(inputValue);
    navigate("/screen2", { state: inputValue });
    setInputValue("");
  }
  
  };
  
  // Render form with input field and submit button
  return (
  <form onSubmit={handleSubmit} className="form">
  <input
       onChange={handleInputChange}
       value={inputValue}
       placeholder="Enter any value"
       className="input"
     />
  
    <button class="cta" type="submit">
      <span>SUBMIT</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  </form>
  
  );
  };
  
  export default Screen1;
  