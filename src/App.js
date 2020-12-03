/* eslint-disable */

import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Route from "./components/Route";
import fire from "./Firebase";
import "./App.css";
import ravensimg from "./images/ravens.jpg";
import Sidebar from "./components/Sidebar";
import News from "./components/News";
var usersDB = fire.firestore().collection("users");

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  // clear messages and inputs ---------------
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // auth error codes and signing in ----------------
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        //Line 40:9:   Expected a default case+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  // auth error codes and signing up ----------------
  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // Line 60:9:   Expected a default case +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });

    // info that's stored in firestore -----------------
    const id = email;
    usersDB.doc(id).set({
      Email: email,
      FullName: name,
    });
  };

  // logout button ---------------------
  const handleLogout = () => {
    window.location.pathname = "/";
    fire.auth().signOut();
  };

  // check if user exists -----------------------
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  // detects auth -----------------------
  useEffect(() => {
    authListener();
  }, []);

  /////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <Route path="/">
            <div className="alvincontainer">
              <div className="sidebar">
                <Sidebar />
              </div>

              <div className="child2">
                <Home handleLogout={handleLogout} user={user} />
              </div>
              <div className="news">
                <News />
              </div>
            </div>
          </Route>

          <Route path="/profile">
            <div className="alvincontainer">
              <div className="sidebar">
                <Sidebar />
              </div>

              <div className="child2">
                <Profile handleLogout={handleLogout} user={user} />
              </div>
              <div className="news">
                <News />
              </div>
            </div>
          </Route>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route path="/">
            <section className="split left">
              <div className="centered">
                <div className="blackbackgrounddiv">
                  <img className="ravens" src={ravensimg} alt="background" />
                </div>
              </div>
            </section>
            <section className="split right">
              <div className="centered">
                <div className="ui middle aligned center aligned grid App">
                  <Login
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                  />
                </div>
              </div>
            </section>
          </Route>
        </React.Fragment>
      )}
      <div className="footer"></div>
    </React.Fragment>
  );
};

export default App;
