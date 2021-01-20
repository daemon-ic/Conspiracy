/* eslint-disable */

import React, { useState, useEffect, useContext } from "react";
import fire from "../Firebase";
import { likeContext } from "../App";
import { unlikeContext } from "../App";

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

const Display2 = ({ loggedInUser, urlUser, items, deleteItem, authUser2 }) => {
  const [list, setList] = useState([]);

  const likePost = useContext(likeContext);
  const unlikePost = useContext(unlikeContext);

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
          //----------------------------------------------------------- Check if current user is on Like List
          //**** Ask adrian more about why not to use state here */
          let hasLiked = false;
          const likeList = itemDisplay.likes;
          const parseLikes = () => {
            for (let i = 0; i < likeList.length; i++) {
              if (authUser2 == likeList[i]) {
                hasLiked = true;
              }
            }
          };
          parseLikes();

          //----------------------------------------------------------- Display number of likes
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
                      <div className="actions">
                        {hasLiked === true ? (
                          <React.Fragment>
                            <text className="reply" style={{ color: "green" }}>
                              {itemDisplay.likes.length}{" "}
                            </text>

                            <a
                              onClick={() =>
                                unlikePost(itemDisplay.likes, itemDisplay.id)
                              }
                              className="reply"
                            >
                              Unlike
                            </a>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <text
                              className="reply"
                              style={{ color: "rgba(0,0,0,.4)" }}
                            >
                              {itemDisplay.likes.length}{" "}
                            </text>
                            <a
                              onClick={() =>
                                likePost(itemDisplay.likes, itemDisplay.id)
                              }
                              className="reply"
                            >
                              Like
                            </a>
                          </React.Fragment>
                        )}
                        {loggedInUser === urlUser ? (
                          <a
                            onClick={() => deleteItem(itemDisplay.id)}
                            className="reply"
                          >
                            Delete
                          </a>
                        ) : null}
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

export default Display2;
