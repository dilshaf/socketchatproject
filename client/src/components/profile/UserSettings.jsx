import React, { useEffect, useState } from "react";
import "./UserSettings.css";
import Header from "../common/Header";
import UserProfile from "../profile/UserProfile";
import Footer from "../common/Footer";

const UserSettings = ({ element }) => {
  // Load dark mode state from localStorage on component mount
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  useEffect(() => {
    // Apply dark mode styles when the darkMode state changes
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

    // Save dark mode state to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    // Toggle the darkMode state
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div className={`parent ${darkMode ? 'dark-mode' : ''}`}  style={{
          backgroundImage: `url("")`,
          backgroundSize: "cover",
        }}>

        <div className="div1">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </div>
        <div className="div2">
          <UserProfile />
          <div
            className="flex-1"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {element}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
