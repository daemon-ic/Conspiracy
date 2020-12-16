/* eslint-disable */

import React from "react";

const Display = ({ items, deleteItem }) => {
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
              <div className="ui comments">
                <div className="comment">
                  {/* <a class="avatar">
    <img src="/images/avatar/small/christian.jpg"></img>
  </a> */}
                  <div className="content">
                    <a className="author">{itemDisplay.user}</a>
                    <div className="metadata">
                      <span className="date">??? days ago</span>
                    </div>

                    <div className="text">{itemDisplay.value}</div>
                    <div className="actions">
                      <a
                        onClick={() => deleteItem(itemDisplay.id)}
                        className="reply"
                      >
                        Delete
                      </a>
                    </div>
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

export default Display;
