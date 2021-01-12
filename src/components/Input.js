/* eslint-disable */

import React from "react";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textInput: {
    paddingLeft: "20px",
    width: "400px",
    fontSize: "20px",
    fontFamily: "sans-serif",
  },
}));

//-------------------------------------------------------

const Input = ({
  onSubmit,
  setTerm,
  term,
  clearPhoto,
  postImg,
  uploadPhoto,
  showPreview,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div
          // className="ui transparent input inputmod1"
          style={{
            border: "none",
            background: "none",
            outline: "none",
            fontColor: "red",
          }}
        >
          <InputBase
            className={classes.textInput}
            style={{}}
            rows={4}
            id="standard-basic"
            placeholder="What's happening?"
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
          />

          {/* <input
            placeholder="What's happening?"
            
          /> */}
        </div>
        {/* ---------------------------------------------------- */}

        {showPreview ? (
          <div className="prevPicContainter">
            <div className="prevPicDiv">
              <div className="imgBorder">
                <img
                  className="previewPic"
                  height="400"
                  weight="400"
                  src={postImg}
                  alt={""}
                />
                <button class="previewPicCancel" onClick={clearPhoto}>
                  X
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              paddingLeft: 10,
            }}
          >
            <IconButton variant="contained" component="label">
              <WallpaperIcon />
              <input type="file" hidden onChange={uploadPhoto} />
            </IconButton>
          </span>
          {/* ---------------------------------------------------- */}
          <span
            className="enterbutton"
            style={{
              paddingRight: 20,
              paddingTop: 5,
            }}
          >
            <button className="mini ui button" onClick={onSubmit}>
              Enter
            </button>
          </span>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Input;
