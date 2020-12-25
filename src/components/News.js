/* eslint-disable */
import React from "react";

function News() {
  return (
    <div>
      <div className="newsbox">
        <div
          style={{
            paddingLeft: "30px",
          }}
        >
          <h3> What's Happening </h3>
          <div
            style={{
              padding: "0px",
              margin: "0px",
              fontSize: ".9em",
            }}
          >
            [ My to-do list with this project ]
          </div>
        </div>
        <br />
        <div className="ui.comments comment">
          <ul>
            <li>
              Learn about compound indexing to make profile posts in order
            </li>
            <li>
              <h5>Troubleshoot avatars not working correctly</h5>
            </li>
            <li>Upload Photos on posts</li>
            <li>Make 'Like' system</li>
            <li>Make Bios</li>
            <li>Visit other people's pages</li>
            <li>Make 'Tweet' button on the sidebar with popout interface</li>
            <li>Make popout interface with posts which allows commenting</li>
            <li>Fix glitch when entering homepage</li>
            <li>Fix errors and css with login page</li>

            <li>Possibly create 'DM's?</li>
            <li>
              <h5>Work on styling</h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default News;
