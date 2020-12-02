import React from "react";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (
    <React.Fragment>
      <div>
        <ul className="sidebarlist">
          {SidebarData.map((val, key) => {
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
