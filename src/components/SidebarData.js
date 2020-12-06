/* eslint-disable */

import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../images/raven-logo.png";

export const SidebarData = [
  {
    title: "",
    icon: <img className="logo" src={logo} alt="logo" />,
    link: "/",
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
    link: "/profile",
  },
];
