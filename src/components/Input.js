/* eslint-disable */

import React from "react";

const Input = ({
  onSubmit,
  setTerm,
  term,
  clearPhoto,
  postImg,
  uploadPhoto,
  showPreview,
}) => {
  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="ui transparent input inputmod1">
          <input
            placeholder="What's happening?"
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
          />
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

        <div>
          <form>
            <input type="file" onChange={uploadPhoto} />
          </form>
        </div>
        {/* ---------------------------------------------------- */}
        <div className="enterbutton">
          <button className="mini ui button" onClick={onSubmit}>
            Enter
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Input;
