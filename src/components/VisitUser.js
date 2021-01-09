/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Display2 from "./Display2";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChangeAvi from "./ChangeAvi";

var itemsDB = fire.firestore().collection("items");

// ------------------------------------------------------------ This is to render list items first and to make them usable

function useItems() {
  const authUser = fire.auth().currentUser.email;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = itemsDB
      .where("user", "==", authUser)
      //.orderBy("timestamp")------ needs to be fixed. compound indexes in firebase
      .onSnapshot((snapshot) => {
        const newItems = snapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
        }));
        setItems(newItems);
      });

    return () => unsubscribe();
  }, []);
  return items;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VisitUser = ({ handleLogout, imgUrl, setImgUrl, firstFunction }) => {
  const items = useItems();

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            setImgUrl={setImgUrl}
            firstFunction={firstFunction}
          />
        </div>

        <div className="mainpanel" />
      </div>

      <Display2 items={items} deleteItem={deleteItem} imgUrl={imgUrl} />
    </React.Fragment>
  );
};

export default Profile;
/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Display2 from "./Display2";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChangeAvi from "./ChangeAvi";

var itemsDB = fire.firestore().collection("items");

// ------------------------------------------------------------ This is to render list items first and to make them usable

function useItems() {
  const authUser = fire.auth().currentUser.email;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = itemsDB
      .where("user", "==", authUser)
      //.orderBy("timestamp")------ needs to be fixed. compound indexes in firebase
      .onSnapshot((snapshot) => {
        const newItems = snapshot.docs.reverse().map((doc) => ({
          ...doc.data(),
        }));
        setItems(newItems);
      });

    return () => unsubscribe();
  }, []);
  return items;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Profile = ({ handleLogout, imgUrl, setImgUrl, firstFunction }) => {
  const items = useItems();

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            setImgUrl={setImgUrl}
            firstFunction={firstFunction}
          />
        </div>

        <div className="mainpanel" />
      </div>

      <Display2 items={items} deleteItem={deleteItem} imgUrl={imgUrl} />
    </React.Fragment>
  );
};

export default VisitUser;
