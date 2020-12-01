import React from "react";

const HomeDisplay = ({ items, deleteItem, editItem }) => {
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => (
          <div className="item" key={itemDisplay.id}>
            <span className="postname">[ {itemDisplay.user} ] </span>
            {itemDisplay.value} <br />
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default HomeDisplay;
