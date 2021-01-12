/* eslint-disable */

import React, { useState, useEffect } from "react";
import fire from "../Firebase";

var usersDB = fire.firestore().collection("users");

function useItems() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsubscribe = usersDB.get().then((snapshot) => {
      const newUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserList(newUsers);
    });

    return () => unsubscribe();
  }, []);
  return userList;
}

const Display2 = ({ loggedInUser, urlUser, items, deleteItem }) => {
  const [list, setList] = useState([]);

  const userList = useItems();

  useEffect(() => {
    let usersPics = [];

    const userLoop = () => {
      for (let i = 0; i < userList.length; i++) {
        const picList = {
          email: userList[i].Email,
          pic: userList[i].ProfilePicture,
        };

        usersPics.push(picList);
      }
    };

    userLoop();
    setList(usersPics);
  }, [userList]);

  const getImg = (itemDisplayUser) => {
    if (list[0]) {
      let result = list.filter((newList) => {
        return newList.email === itemDisplayUser;
      });

      return result[0].pic;
    }
  };

  const timestamp = (itemDisplayTimestamp) => {
    const result = Date.now() - itemDisplayTimestamp;
    const seconds = result / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return Math.floor(minutes) + "m";
    } else if (hours < 24) {
      return Math.floor(hours) + "h";
    } else if (days < 7) {
      return Math.floor(days) + "d";
    } else if (weeks < 4) {
      return Math.floor(weeks) + "w";
    } else if (months < 12) {
      return Math.floor(months) + "mo";
    } else {
      return Math.floor(years) + "y";
    }
  };
  //-------------------------------------------------------------
  return (
    <React.Fragment>
      <ul className="ui list">
        {items.map((itemDisplay) => {
          //-----------------------------------------------------
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
                        src={getImg(itemDisplay.user)}
                        alt={""}
                      />

                      {/* ------------------------------------------------------------------ */}
                    </a>

                    <div className="content">
                      <a className="author">{itemDisplay.user}</a>

                      <div className="metadata">
                        <span className="date">
                          {timestamp(itemDisplay.timestamp)}
                        </span>
                      </div>

                      <div className="text">{itemDisplay.value}</div>
                      {itemDisplay.pic ? (
                        <img
                          className="previewPic"
                          height="400"
                          width="400"
                          src={itemDisplay.pic}
                          alt={""}
                        />
                      ) : null}
                      {/*---------------------------------------------------------------- DELETE BUTTON*/}
                      {loggedInUser === urlUser ? (
                        <div className="actions">
                          <a
                            onClick={() => deleteItem(itemDisplay.id)}
                            className="reply"
                          >
                            Delete
                          </a>
                        </div>
                      ) : null}
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

export default Display2;
