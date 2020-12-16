/* eslint-disable */

import { RecentActorsRounded } from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { storage } from "../Firebase";
import fire from "../Firebase";

var usersDB = fire.firestore().collection("users");

const Upload2 = () => {
  const [fileUrl, setFileUrl] = useState(null);
  //   const [picUrl, setPicUrl] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    // I ALSO WANT TO MAKE THE PROFILE PICS GO IN INDIVIDUAL FOLDERS HERE vvv
    const fileRef = storageRef.child(`Profile_Pics/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const storeUrl = () => {
    const authUser = fire.auth().currentUser.email;

    usersDB.doc(authUser).update({
      ProfilePicture: fileUrl,
    });
  };

  storeUrl(fileUrl);

  // CURRENT ISSUE : I WAS ABLE TO SAVE THE IMAGE URL TO THE PROFILE IN FIREBASE. NOW I WANT THIS PAGE TO PULL FROM THAT
  // also prevent picurl reverting back to null when the page is reloaded

  const picUrl = usersDB.doc("alvinsewram@gmailcom").ProfilePicture;
  console.log(`picUrl: ${picUrl}`);

  return (
    <React.Fragment>
      <div>
        <img width="100" height="100" src={picUrl} alt={""} />
      </div>
      <form>
        <input type="file" onChange={onFileChange} />
      </form>
    </React.Fragment>
  );
};

export default Upload2;
