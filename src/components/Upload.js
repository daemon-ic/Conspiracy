/* eslint-disable */

import React, { useState } from "react";
import fire from "../Firebase";
import storage from "../Firebase";

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
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
