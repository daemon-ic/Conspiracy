/* eslint-disable */
import React, { useState, useEffect } from "react";

function News() {
  const [cardList, setCardList] = useState([]);

  const trelloKey = "a9f389753d77ce2e2cb756ef9e26a20a";
  const trelloToken =
    "7d6d8bc4ac8c64429667b7000b6417586577201492b2c1369d1122cf38707b93";
  const todoList = "5ffb10f507aab85dbcf40161";
  const cardArr = [];

  useEffect(() => {
    console.log("useEffect fired!");
    getInfo();
  }, []);

  //-----------------------------------------------

  const getInfo = () => {
    console.log("fetching");
    fetch(
      `https://api.trello.com/1/lists/${todoList}/cards?key=${trelloKey}&token=${trelloToken}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.json();
      })

      .then((cards) => {
        for (let i = 0; i < cards.length; i++) {
          const getCards = cards[i].name;
          cardArr.push(getCards);
        }
        setCardList(cardArr);
      })
      .catch((err) => console.error(err));
  };

  //---------------------------------------------------------------------

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
            [ Update Log powered via Trello API ]
          </div>
        </div>
        <br />

        {/* ----------------------------------------------------------------- */}

        {cardList.map((cardDisplay) => {
          return (
            <div className="ui.comments comment">
              <ul
                style={{
                  listStyle: "none",
                }}
              >
                <li>{cardDisplay}</li>
              </ul>
            </div>
          );
        })}

        {/* ----------------------------------------------------------------- */}
      </div>
    </div>
  );
}

export default News;
