/* eslint-disable */

import React, { useEffect, useState } from "react";
import fire from "../Firebase";
import "../App.css";
import Input from "./Input";
import HomeDisplay from "./HomeDisplay";
import { v4 as uuidv4 } from "uuid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { storage } from "../Firebase";

var itemsDB = fire.firestore().collection("items");

//////////////////////////////////////////////////////////////////////

function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = itemsDB.orderBy("timestamp").onSnapshot((snapshot) => {
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

const Home = ({
  authUser2,
  handleLogout,
  imgUrl,
  setImgUrl,
  firstFunction,
}) => {
  const items = useItems();
  const [term, setTerm] = useState("");
  const [postImg, setPostImg] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  ///////////////////////////////////////////////////////////////////////

  const uploadPhoto = async (e) => {
    setShowPreview(true);

    const file = e.target.files[0];
    const randNum = uuidv4();

    // i dont want to save the preview to storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`postPics/${file.name}_${randNum}`);
    await fileRef.put(file);

    // but this gets the Url that I need... maybe make a preview folder then delete the preview on real upload
    const downloadUrl = await fileRef.getDownloadURL();
    setPostImg(downloadUrl);
  };

  const clearPhoto = () => {
    setPostImg("");
    setShowPreview(false);
  };

  //////////////////////////////////////////////////////////////

  function onSubmit(e) {
    e.preventDefault();
    const authUser = fire.auth().currentUser.email;
    const timestamp = Date.now();
    const id = uuidv4();

    itemsDB
      .doc(id)
      .set({
        timestamp,
        user: authUser,
        id,
        value: term,
        pic: postImg,
        likes: [],
      })
      .then(() => {
        setPostImg("");
        setShowPreview(false);
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
              <h2>Home</h2>
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
        <div className="mainpanel">
          <br />
          <Input
            clearPhoto={clearPhoto}
            uploadPhoto={uploadPhoto}
            postImg={postImg}
            showPreview={showPreview}
            term={term}
            setTerm={setTerm}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <HomeDisplay authUser2={authUser2} items={items} imgUrl={imgUrl} />
    </React.Fragment>
  );
};

export default Home;
