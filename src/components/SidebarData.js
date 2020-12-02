import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },

  {
    title: "Messages",
    icon: <MailIcon />,
    link: "/",
  },

  {
    title: "Profile",
    icon: <PersonIcon />,
    link: "/profile",
  },
];
