import React from "react";

const Display = ({ items, deleteItem, editItem }) => {
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => (
          <div className="item" key={itemDisplay.id}>
            {itemDisplay.value}
            <button
              onClick={() => deleteItem(itemDisplay.id)}
              className="mini ui button"
            >
              x
            </button>
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Display;
