/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Display2 from "./Display2";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChangeAvi from "./ChangeAvi";

// DECLARES DATABASES

var itemsDB = fire.firestore().collection("items");
var usersDB = fire.firestore().collection("users");

// A FUNCTION THAT READS THE FIREBASE AND THEN MAKES IT USEABLE

function useItems() {
  // SETTING VARIABLES AND STATES

  const [items, setItems] = useState([]);
  let userList = [];
  let currentUser = "";

  // USEEFFECT HOOK

  useEffect(() => {
    // ON PAGE LOAD, GET THE LIST OF USERS

    const handleUID = async () => {
      await usersDB.get().then((snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        // SAVE THE USER LIST TO A PREVIOUSLY SET VARIABLE

        userList = results;
      });

      // GET THE UID WITHIN THE URL

      const urlArr = window.location.pathname.split("/");
      const UID = urlArr[2];

      // CHECK THE USER LIST FOR THE UID, AND RETURN THAT USERS EMAIL

      for (let i = 0; i < userList.length; i++) {
        if (UID === userList[i].UID) {
          console.log(userList[i]);
          currentUser = userList[i];
        }
      }

      // THIS IS TO GET THE LIST OF POSTS FROM FIREBASE AND MAKE IT USEABLE

      const unsubscribe = itemsDB // declares unique variable to onSnapshot
        .where("user", "==", currentUser.Email) // compares user value to URL user in order to display the right posts

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
  // return { items, currentUser }; // ????
  return items;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Profile = ({ handleLogout, imgUrl, setImgUrl, firstFunction }) => {
  // const { items, currentUser } = useItems(); // < --------- this is the issue on display 2
  const items = useItems();

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    // currentUser && (
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
          {/* ------------------------------------------------------------------ */}

          <div className="alvinavatar">
            <img
              className="alvinavatar"
              height="140"
              weight="140"
              src={imgUrl}
              alt={""}
            />
          </div>

          {/* ------------------------------------------------------------------ */}

          <ChangeAvi
            imgUrl={imgUrl}
            // imgUrl={currentUser.ProfilePicture}
            setImgUrl={setImgUrl}
            firstFunction={firstFunction}
          />
        </div>

        <div className="mainpanel" />
      </div>
      {/* WILL HAVE TO CHANGE img url to current user VVVV */}
      <Display2 items={items} deleteItem={deleteItem} imgUrl={imgUrl} />
    </React.Fragment>
  );
};

export default Profile;
