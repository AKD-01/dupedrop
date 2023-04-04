// Importing necessary dependencies from React and React Router DOM
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Screen2.css";

const Screen2 = () => {
  // Destructure "state" from the useLocation hook
  const { state } = useLocation();

  // Memoize the input string to avoid unnecessary re-renders
  const inputString = useMemo(() => [...state], [state]);

  // Use state hook to store an array of objects with each character and its corresponding ID and color
  const [charArray, setCharArray] = useState(
    inputString.map((element, index) => ({
      id: `${element}${index}`,
      value: element,
    }))
  );

  // Use state hook to store a map of each character and its corresponding color code
  const [colorCodes, setColorCodes] = useState({});

  // Use state hook to store whether all characters are unique and set a boolean value
  const [successHeader, setSuccessHeader] = useState(false);

  // Use useEffect hook to map each character in the input string to its color code
  useEffect(() => {
    // Define a function to map each character to a color code
    function mapStringToColorCode(str) {
      // Loop through each character in the string and map it to its corresponding color code
      const newColorCodes = {};
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (colorCodes[char]) {
          // Use existing color code if available
          newColorCodes[char] = colorCodes[char];
        } else {
          // Generate a new color code if not
          const colorCode = getColorCode(char);
          newColorCodes[char] = colorCode;
        }
      }

      return newColorCodes;
    }

    // Call the function to map each character to its color code and update state
    const newColorCodes = mapStringToColorCode(inputString);
    setColorCodes(newColorCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save a copy of the original string in a variable
  const originalString = [...state];

  // Define a function to generate a unique color code for a given character
  function getColorCode(char) {
    let colorCode = "#";

    // Generate a random 6-digit hexadecimal number
    for (let i = 0; i < 6; i++) {
      colorCode += Math.floor(Math.random() * 16).toString(16);
    }

    let hash = 0;

    for (let i = 0; i < colorCode.length; i++) {
      hash = (hash << 5) - hash + colorCode.charCodeAt(i);
    }

    return colorCode;
  }

  // A function to remove all characters from the charArray except the one at a given index
  function removeCharExceptAtIndex(value, id) {
    const result = [];
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i].value === value && charArray[i].id !== id) {
        // Skip over any characters that match the value but not the ID
        continue;
      }
      result.push(charArray[i]);
    }
    setCharArray(result);
  }

  // Concatenate all characters in charArray to create a string
  let updatedString = "";
  for (let i = 0; i < charArray.length; i++) {
    updatedString += charArray[i].value;
  }

  // Use useEffect hook to check if all characters are unique and update the successHeader state
  useEffect(() => {
    const uniqueCharaccters = new Set(updatedString);
    setSuccessHeader(uniqueCharaccters.size === updatedString.length);
  }, [updatedString]);

  return (
    <div>
      <div className="cont">
        <div className="cards-container">
          {charArray.map((char) => (
            <div
              className="card"
              style={{
                backgroundColor: colorCodes[char.value],
              }}
              key={char.id}
            >
              <div className="delete-button-container">
                <button
                  className="delete-button"
                  onClick={() => removeCharExceptAtIndex(char.value, char.id)}
                >
                  &#x292C;
                </button>
              </div>
              <div className="card-text">{char.value}</div>
            </div>
          ))}
        </div>
        <br />
        <div className="result-card">
          <div className="result-heading">ORIGINAL TEXT :</div>
          <div className="result-text">{originalString}</div>
          <br />
          <div className="result-heading">UPDATED TEXT : </div>
          <div className="result-text">{updatedString}</div>
          {successHeader && (
            <div className="success-header">
              SUCCESS! No remaining duplicate characters in your input text.
            </div>
          )}
          <div className="back-button">
            <button className="button-style">
              <Link to="/" className="link-style">
                Back to Home
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen2;
