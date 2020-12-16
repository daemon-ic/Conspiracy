/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Input from "./Input";
import Display from "./Display";
import Upload from "./Upload";
import Upload2 from "./Upload2";
import { v4 as uuidv4 } from "uuid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

var itemsDB = fire.firestore().collection("items");

//////////////////////////////////////////////////////////////////////

function useItems() {
  const authUser = fire.auth().currentUser.email;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = itemsDB
      .where("user", "==", authUser)
      //.orderBy("timestamp")
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

///////////////////////////////////////////////////////////////////////

const Profile = ({ handleLogout, user }) => {
  const [showEdit, setShowEdit] = useState(true);
  const items = useItems();
  const [term, setTerm] = useState("");
  const [updateId, setUpdateId] = useState(false);

  function deleteItem(itemId) {
    itemsDB.doc(itemId).delete();
  }

  function editItem(itemDisplay) {
    setTerm(itemDisplay.value);
    setUpdateId(itemDisplay.id);

    setShowEdit(false);
  }

  function updateItem(e) {
    e.preventDefault();
    setShowEdit(true);
    console.log("term: ", term);

    itemsDB
      .doc(updateId)
      .update({
        value: term,
      })
      .then(() => {
        setTerm("");
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    const authUser = fire.auth().currentUser.email;

    const id = uuidv4();
    itemsDB
      .doc(id)
      .set({
        user: authUser,
        id,
        value: term,
      })
      .then(() => {
        setTerm("");
      });
  }

  /////////////////////////////////////////////////////////////
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
        {
          //-----------------------------------------------------
        }
        <Upload2 />
        <div className="mainpanel">
          <br />
          <Input
            term={term}
            setTerm={setTerm}
            onSubmit={onSubmit}
            updateItem={updateItem}
            showEdit={showEdit}
          />
        </div>
      </div>
      <Display items={items} deleteItem={deleteItem} editItem={editItem} />
    </React.Fragment>
  );
};

export default Profile;
