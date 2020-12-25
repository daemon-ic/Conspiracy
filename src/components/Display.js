/* eslint-disable */

import React, { useState, useEffect } from "react";
import fire from "../Firebase";

var usersDB = fire.firestore().collection("users");

const Display = ({ items, deleteItem, imgUrl }) => {
  // THIS IS WHAT I NEED TO DO :
  //--------------------------------------------------------------------
  // GOOD 1) Establish a link to a users firebase file
  //  GOOD 2) Grab users emails from their itemDisplay.user in render/map, and make it usable
  // 3) Figure out the relationship between awaits and maps
  //------------------------------------------------------------------------

  // const [url, setUrl] = useState("");

  const uniquePic = async (itemDisplayUser) => {
    const query = (await usersDB.doc(itemDisplayUser).get()).data()
      .ProfilePicture;
    console.log("This is unique pic from app", query);
    console.log("This is the display name brought up", itemDisplayUser);
  };

  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => {
          // const Url = await uniquePic(itemDisplay.user);
          // setUrl(Url);

          // console.log(itemDisplay.user);
          // console.log(await uniquePic("alvinsewram@gmail.com"));

          return (
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
                    <a class="avatar">
                      {/* ------------------------------------------------------------------ */}
                      <img
                        className="alvinavatar"
                        height="50"
                        weight="50"
                        src={uniquePic(itemDisplay.user)}
                        alt={""}
                      />
                      {/* ------------------------------------------------------------------ */}
                    </a>

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
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Display;
