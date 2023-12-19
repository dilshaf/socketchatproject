import React from "react";
import "./UserSettings.css";
import Header from "../common/Header";
import UserProfile from "../profile/UserProfile";

import Footer from "../common/Footer";

const UserSettings = ({ element }) => {
  return (
    <div>
      <div className="parent">
        <div className="div1">
          <Header />
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

      {/* <Footer /> */}
    </div>
  );
};

export default UserSettings;
