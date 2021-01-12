/* eslint-disable */

import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../images/raven-logo.png";

function Sidebar({ UID }) {
  const sidebarData = [
    {
      title: "",
      icon: <img className="logo" src={logo} alt="logo" />,
      link: "/home",
    },

    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },

    // {
    //   title: "Messages",
    //   icon: <MailIcon />,
    //   link: "/",
    // },

    {
      title: "Profile",
      icon: <PersonIcon />,
      link: "/profile/" + UID,
    },
  ];

  return (
    <React.Fragment>
      <div>
        <ul className="sidebarlist">
          {sidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="sidebarrow"
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                {" "}
                <div className="sidebaricon">{val.icon}</div>
                <div className="sidebarwords">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
