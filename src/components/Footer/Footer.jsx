import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={logoStyle}>
          <span style={iconStyle}>&#128214;</span> Readify
        </p>
        <p style={textStyle}>
          &copy; 2023 Readify. All rights reserved.
        </p>
        <p style={textStyle}>
          Designed with <span style={heartStyle}>&#10084;</span> by Khouloud Mekni
        </p>
       
      </div>
    </footer>
  );
}

// Define the styles
const footerStyle = {
  backgroundColor: "#ffd600",
  color: "#333",
  padding: "40px",
  textAlign: "center",
  fontFamily: "Arial, sans-serif"
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto"
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px"
};

const iconStyle = {
  color: "#333"
};

const heartStyle = {
  color: "#ff4081"
};

const textStyle = {
  fontSize: "14px",
  marginBottom: "10px"
};


export default Footer;
