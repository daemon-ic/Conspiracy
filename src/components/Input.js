import React from "react";

const Input = ({ onSubmit, updateItem, setTerm, term, showEdit }) => {
  return (
    <React.Fragment>
      {showEdit ? (
        <form onSubmit={onSubmit}>
          <div className="ui transparent input">
            <input
              placeholder="What's happening?"
              value={term}
              onChange={(e) => setTerm(e.currentTarget.value)}
            />
          </div>
          <div className="enterbutton">
            <button className="mini ui button" onClick={onSubmit}>
              Enter
            </button>
          </div>
        </form>
      ) : (
        <form>
          <div className="ui transparent input">
            <input
              placeholder="What's happening?"
              value={term}
              onChange={(e) => setTerm(e.currentTarget.value)}
            />
          </div>
          <div className="enterbutton">
            <button className="mini ui button" onClick={updateItem}>
              Edit
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default Input;
