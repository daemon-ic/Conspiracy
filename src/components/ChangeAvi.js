/* eslint-disable */

import React from "react";

const ChangeAvi = ({ firstFunction }) => {
  return (
    <React.Fragment>
      <form>
        <input type="file" onChange={firstFunction} />
      </form>
    </React.Fragment>
  );
};

export default ChangeAvi;
