/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Display2 from "./Display2";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//------------------------------------------------------------- Text Styles

const theme = createMuiTheme({
  palette: {},
});

const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: "20px",
    fontSize: "20px",
    fontFamily: "sans-serif",
  },
  email: {
    paddingTop: "0px",
    paddingLeft: "20px",
    fontSize: "13px",
    fontFamily: "sans-serif",
  },
  body: {
    wordBreak: "normal",
    paddingTop: "20px",
    paddingLeft: "20px",
    fontSize: "15px",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    color: "grey",
    wordBreak: "normal",
    paddingTop: "20px",
    paddingLeft: "20px",
    fontSize: "15px",
    fontFamily: "sans-serif",
  },
  editbutton: {
    margin: theme.spacing(1),
    fontColor: "#2979ff",
  },
}));

//------------------------------------------------------------- Text Styles
//------------------------------------------------------------- Declare Variables

var itemsDB = fire.firestore().collection("items");
var usersDB = fire.firestore().collection("users");

//------------------------------------------------------------- Declare Variables

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
        //.orderBy("timestamp") NEEDS TO BE FIXED WITH COMPOUND UPDATES IN FIREBASE ***
        .onSnapshot((snapshot) => {
          const newItems = snapshot.docs.reverse().map((doc) => ({
            ...doc.data(),
          }));
          setItems(newItems);
        });
      return () => unsubscribe();
    };
    handleUID();
  }, []);

  return { items, currentUser };
}
//------------------------------------------------------------- Main Component

const Profile = ({ handleLogout, imgUrl, firstFunction, authUser2 }) => {
  const [editBioToggle, setEditBioToggle] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const classes = useStyles();
  const items = useItems();

  const loggedInUser = fire.auth().currentUser.uid;
  const urlUser = items.currentUser.UID;

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
  }

  const editBio = (e) => {
    // (pressing Submit)

    e.preventDefault();
    usersDB.doc(items.currentUser.Email).update({ Bio: bioInput });

    setEditBioToggle(false);
    setBioInput("");
    location.reload();
  };

  const enterNewBio = () => {
    // (pressing Edit)
    setBioInput(items.currentUser.Bio);
    setEditBioToggle(true);
  };

  //------------------------------------------------------------- Main Component

  //------------------------------------------------------------- Render
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
          {/* PROFILE PICTURE */}

          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
              }}
            >
              <div className="overlay">
                <label htmlFor="file-file">
                  <div
                    style={{
                      position: "relative",
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      Change Photo
                    </div>
                  </div>
                </label>
                <input
                  id="file-file"
                  style={{
                    display: "none",
                  }}
                  type="file"
                  onChange={firstFunction}
                />
              </div>

              <img
                className="alvinavatar"
                height="140"
                width="140"
                src={items.currentUser.ProfilePicture}
                alt={""}
              />
            </div>

            {/* BIO */}

            <div
              style={{
                width: "90%",
                paddingTop: "30px",
                backgroundColor: "",
              }}
            >
              <Typography className={classes.title}>
                {items.currentUser.FullName}
              </Typography>

              <Typography className={classes.email}>
                {items.currentUser.Email}
              </Typography>
              {editBioToggle ? (
                <InputBase
                  multiline
                  className={classes.input}
                  placeholder="Enter your bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.currentTarget.value)}
                />
              ) : (
                <Typography className={classes.body}>
                  {items.currentUser.Bio}
                </Typography>
              )}
            </div>
          </div>

          {/* CHANGE AVATAR */}
          {loggedInUser === urlUser ? (
            <div style={{ display: "flex", paddingRight: 16 }}>
              {editBioToggle ? (
                <Button
                  style={{ marginLeft: "auto" }}
                  variant="outlined"
                  onClick={editBio}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: "auto" }}
                  variant="outlined"
                  onClick={enterNewBio}
                >
                  Edit Bio
                </Button>
              )}
            </div>
          ) : null}
        </div>

        <div className="mainpanel" />
      </div>

      <Display2
        authUser2={authUser2}
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
//------------------------------------------------------------- Render
