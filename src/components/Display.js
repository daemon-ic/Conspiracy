/* eslint-disable */

import React from "react";

const Display = ({ items, deleteItem, editItem }) => {
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => (
          <div
            className="list"
            style={{
              borderBottom: "1px solid lightgray",
              paddingBottom: "5px",
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
                    {/* Line 23:21:  The href attribute is required for an anchor to be keyboard accessible.
                   Provide a valid, navigable address as the href value. If you cannot provide an href,
                    but still need the element to resemble a link, use a button and change it with appropriate styles.
                     Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md */}
                    <a class="author">{itemDisplay.user}</a>
                    <div class="metadata">
                      {/* Line 29:23:  The href attribute is required for an anchor to be keyboard accessible. 
                    Provide a valid, navigable address as the href value. If you cannot provide an href, 
                    but still need the element to resemble a link, use a button and change it with appropriate styles. 
                    Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
                      <span class="date">??? days ago</span> */}
                    </div>
                    <div class="text">{itemDisplay.value}</div>
                    <div class="actions">
                      <a
                        onClick={() => deleteItem(itemDisplay.id)}
                        class="reply"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          // <div className="item" key={itemDisplay.id}>
          //   {itemDisplay.value}
          //   <button
          //     onClick={() => deleteItem(itemDisplay.id)}
          //     className="mini ui button"
          //   >
          //     x
          //   </button>
          // </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Display;
