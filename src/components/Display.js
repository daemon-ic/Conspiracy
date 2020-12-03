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
                    <a class="author">{itemDisplay.user}</a>
                    <div class="metadata">
                      <span class="date">??? days ago</span>
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
