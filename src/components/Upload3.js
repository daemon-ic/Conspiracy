/* eslint-disable */

import { RecentActorsRounded } from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import { storage } from "../Firebase";
import fire from "../Firebase";

var usersDB = fire.firestore().collection("users");

///////////////////////////////////////////////////////////////////////////////////////////////////////

const Upload3 = () => {
  const [imgUrl, setImgUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-ec8f6.appspot.com/o/Default_Image.jpg?alt=media&token=9a2333c8-56b9-45b4-9c70-f21c37760b71"
  );
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getPicFromUser();
  }, []);

  const getPicFromUser = () => {
    const authUser = fire.auth().currentUser.email;
    usersDB
      .doc(authUser)
      .get()
      .then((snapshot) => {
        setImgUrl(snapshot.data().ProfilePicture);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const firstFunction = async (e) => {
    // ------------------------------------------------------------ Saving image to storage

    const file = e.target.files[0];
    const storageRef = storage.ref();
    // *** Edit this to make each person have their own pic folder
    const fileRef = storageRef.child(`Profile_Pics/${file.name}`);
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();

    // ------------------------------------------------------------ Got Url and put in state

    setImgUrl(downloadUrl);

    //------------------------------------------------------------- Fire linking to user

    updateUser(downloadUrl);
  };

  const updateUser = async (downloadUrl) => {
    const authUser = fire.auth().currentUser.email;
    console.log(authUser);
    await usersDB.doc(authUser).update({ ProfilePicture: downloadUrl });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <div>
        <img width="100" height="100" src={imgUrl} alt={""} />
      </div>
      <form>
        <input type="file" onChange={firstFunction} />
      </form>
    </React.Fragment>
  );
};

export default Upload3;
