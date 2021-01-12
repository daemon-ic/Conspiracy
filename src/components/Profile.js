/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Display2 from "./Display2";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

var itemsDB = fire.firestore().collection("items");
var usersDB = fire.firestore().collection("users");

function useItems() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  let userList = [];
  let currentUserEmail = "";

  useEffect(() => {
    const handleUID = async () => {
      await usersDB.get().then((snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        userList = results;
      });

      const urlArr = window.location.pathname.split("/");
      const UID = urlArr[2];

      for (let i = 0; i < userList.length; i++) {
        if (UID === userList[i].UID) {
          setCurrentUser(userList[i]);
          currentUserEmail = userList[i].Email;
        }
      }

      const unsubscribe = itemsDB
        .where("user", "==", currentUserEmail)

        //.orderBy("timestamp")----------------------------------------------------- NEEDS TO BE FIXED WITH COMPOUND UPDATES IN FIREBASE ***

        .onSnapshot((snapshot) => {
          // updates list every time there is an update
          const newItems = snapshot.docs.reverse().map((doc) => ({
            // show the list of all post data
            ...doc.data(),
          }));
          setItems(newItems); //set it to state
        });

      return () => unsubscribe(); // calls its own function when page is loaded
    };
    handleUID();
  }, []);

  return { items, currentUser }; // ????

  // return items;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Profile = ({ handleLogout, imgUrl, setImgUrl, firstFunction }) => {
  const items = useItems(); // < --------- this is the issue on display 2

  const loggedInUser = fire.auth().currentUser.uid;
  const urlUser = items.currentUser.UID;

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
    console.log("authUser: ", loggedInUser);
    console.log("urlUser: ", urlUser);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <div className="homeheader">
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid lightgray",
            }}
          >
            <div>
              <h2>Profile</h2>
            </div>

            <div
              style={{
                paddingTop: "5px",
                marginLeft: "auto",
              }}
            >
              <ExitToAppIcon onClick={handleLogout} />
            </div>
          </div>
        </section>

        <div>
          {/* ------------------------------------------------------------------ PROFILE PICTURE */}

          <div className="alvinavatar">
            <img
              className="alvinavatar"
              height="140"
              weight="140"
              src={items.currentUser.ProfilePicture}
              alt={""}
            />
          </div>

          {/* ------------------------------------------------------------------ CHANGE AVATAR */}
          {loggedInUser === urlUser ? (
            <form>
              <input type="file" onChange={firstFunction} />
            </form>
          ) : null}
        </div>

        <div className="mainpanel" />
      </div>
      <Display2
        loggedInUser={loggedInUser}
        urlUser={urlUser}
        items={items.items}
        deleteItem={deleteItem}
        imgUrl={imgUrl}
      />
    </React.Fragment>
  );
};

export default Profile;
