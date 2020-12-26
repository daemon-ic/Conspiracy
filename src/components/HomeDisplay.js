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

const HomeDisplay = ({ items }) => {
  const [list, setList] = useState([]);

  const userList = useItems();

  useEffect(() => {
    console.log("useEffect fired!---------------------------");
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
                        <span className="date">??? days ago</span>
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
                      <div className="actions"></div>
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

export default HomeDisplay;
