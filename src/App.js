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
import { storage } from "./Firebase";

var usersDB = fire.firestore().collection("users");

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [authUser2, setAuthUser2] = useState("");
  let UID = "";

  // FOR PROFILE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

  //---------------------------------------------------------- Default image for Avi in state

  const [imgUrl, setImgUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-ec8f6.appspot.com/o/profilePics%2Fdefault%2FDefault_Image.jpg?alt=media&token=7231ff52-cf7e-49a7-aa31-d19f0fa99337"
  );

  //----------------------------------------------------------- On mount

  useEffect(() => {


    const getPicFromUser = async () => {
      const authUser = await fire.auth().currentUser.email;
      setAuthUser2(authUser);

      const getUid = await fire.auth().currentUser.uid;
      UID = getUid;
      console.log("useEffect UID log: ", UID )


  //------------------------------------------------------------ Get avi image from User docs and save url to state

      usersDB
        .doc(authUser)
        .get()
        .then((snapshot) => {
          setImgUrl(snapshot.data().ProfilePicture);
        });
    };

    // Callback : adding listener to FB auth state change. ( For firebase Auth specifically)

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        getPicFromUser();
      }
    });


  }, []);

  const firstFunction = async (e) => {

    // ------------------------------------------------------------ Saving Avi upload to storage and then get URL

    const file = e.target.files[0];
    const storageRef = storage.ref();
    const authUser = fire.auth().currentUser.email;
    const fileRef = storageRef.child(`profilePics/${authUser}/profilePic`);
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();

    // ------------------------------------------------------------ Got Url and put in state

    setImgUrl(downloadUrl);

    //------------------------------------------------------------- Take Avi URL and place in User doc

    updateUser(downloadUrl);
  };

  const updateUser = async (downloadUrl) => {
    const authUser = fire.auth().currentUser.email;
    await usersDB.doc(authUser).update({ ProfilePicture: downloadUrl });
  };

  // FOR LOGIN //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //------------------------------------------------------------- Clear login inputs 

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };


    //------------------------------------------------------------- Clear login errors

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

     //------------------------------------------------------------- Login stuff

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
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

     //------------------------------------------------------------- Login stuff

    const handleSignup = () => {
      console.log("Fire handleSignup");
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)

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

      console.log("Signup UID log:", UID);

    // info that's stored in firestore -----------------
    const id = email;
    usersDB.doc(id).set({
      Email: email,
      FullName: name,
      ProfilePicture:
        "https://firebasestorage.googleapis.com/v0/b/twitter-clone-ec8f6.appspot.com/o/profilePics%2Fdefault%2FDefault_Image.jpg?alt=media&token=7231ff52-cf7e-49a7-aa31-d19f0fa99337",
      

        

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
                <Home
                  authUser2={authUser2}
                  handleLogout={handleLogout}
                  user={user}
                  imgUrl={imgUrl}
                  setImgUrl={setImgUrl}
                  firstFunction={firstFunction}
                />
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
                <Profile
                  handleLogout={handleLogout}
                  user={user}
                  imgUrl={imgUrl}
                  setImgUrl={setImgUrl}
                  firstFunction={firstFunction}
                />
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
