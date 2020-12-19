/* eslint-disable */

import React from "react";

const HomeDisplay = ({ items, imgUrl }) => {
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => (
          <div
            style={{
              borderBottom: "1px solid lightgray",
              paddingBottom: "5px",
            }}
          >
            <div className="listmods1">
              <div className="item" key={itemDisplay.id}></div>
              <div class="ui comments">
                <div class="comment">
                  <a class="avatar">
                    {/* ------------------------------------------------------------------ */}
                    <img
                      className="alvinavatar"
                      height="50"
                      weight="50"
                      src={imgUrl}
                      alt={""}
                    />
                    {/* ------------------------------------------------------------------ */}
                  </a>
                  <div class="content">
                    <a class="author">{itemDisplay.user}</a>
                    <div class="metadata">
                      <span class="date">??? days ago</span>
                    </div>
                    <div class="text">{itemDisplay.value}</div>
                    <div class="actions"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default HomeDisplay;
