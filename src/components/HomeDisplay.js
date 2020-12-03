/* eslint-disable */

import React from "react";

const HomeDisplay = ({ items }) => {
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => (
          <div
            style={{
              borderBottom: "1px solid lightgray",
            }}
          >
            <div className="listmods1">
              <div className="item" key={itemDisplay.id}></div>
              <div class="ui comments">
                <div class="comment">
                  {/* <a class="avatar">
                <img src="/images/avatar/small/christian.jpg"></img>
              </a> */}
                  <div class="content">
                    {/* Line 21:21:  The href attribute is required for an anchor to be keyboard accessible. 
                  Provide a valid, navigable address as the href value. If you cannot provide an href, 
                  but still need the element to resemble a link, use a button and change it with appropriate styles. 
                  Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md */}
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
