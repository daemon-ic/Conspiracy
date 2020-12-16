/* eslint-disable */

import React, { useState } from "react";
import { storage } from "../Firebase";

const Upload = () => {
  const [image, setImage] = useState(null);
  // const [error, setError] = useState(null);

  // const types = ["image/png", "image/jpg"];

  const handleChange = (e) => {
    let selected = setImage(e.target.files[0]);

    if (selected && types.includes(selected.type)) {
      setImage(selected);
      // setError(null);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`profilepic/Profile_Pic`).put(image);
    uploadTask.on(
      "state_changed",
      // (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };
  console.log("image: ", image);
  return (
    <React.Fragment>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </React.Fragment>
  );
};

export default Upload;
