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
export const likeContext = React.createContext();
export const unlikeContext = React.createContext();

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [authUser2, setAuthUser2] = useState("");
  const [UID, setUID] = useState("");
  const [windowLocationState, setWindowLocationState] = useState("");

  var itemsDB = fire.firestore().collection("items");
  var usersDB = fire.firestore().collection("users");

  // FOR PROFILE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //---------------------------------------------------------- Default image for Avi in state

  const [imgUrl, setImgUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/twitter-clone-ec8f6.appspot.com/o/profilePics%2Fdefault%2FDefault_Image.jpg?alt=media&token=7231ff52-cf7e-49a7-aa31-d19f0fa99337"
  );

  //----------------------------------------------------------- On mount

  useEffect(() => {
    const authListener = () => {
      console.log("1 Detecting User");
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
          console.log("user: ", user);
          if (window.location.pathname === "/") {
            window.location.pathname = "/home";
          }
        } else {
          if (window.location.pathname === "/") {
            window.location.pathname = "/login";
          }
          setUser("");
        }
      });
    };
    authListener();
  }, []);

  useEffect(() => {
    const applyUID = async () => {
      console.log("4 Getting UID from Firebase (applyUID)");
      const authUser = await fire.auth().currentUser.email;
      const getUid = await fire.auth().currentUser.uid;
      console.log(" 5 Adding users UID into UserDoc");
      usersDB.doc(authUser).update({ UID: getUid });

      setUID(getUid);
    };

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        applyUID();
      }
    });
  }, []);

  useEffect(() => {
    const urlArr = window.location.pathname.split("/");
    const urlUID = urlArr[2];

    if (urlUID !== windowLocationState) {
      setWindowLocationState(urlUID);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    const getPicFromUser = async () => {
      const authUser = await fire.auth().currentUser.email;
      setAuthUser2(authUser);

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

    location.reload();
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
      .then(() => (window.location.pathname = "/home"))
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

  const handleSignup = () => {
    console.log(" 2 Applying email and password");
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => (window.location.pathname = "/home"))
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
    console.log("3 Populating user doc");
    usersDB.doc(id).set({
      Email: email,
      FullName: name,
      ProfilePicture:
        "https://firebasestorage.googleapis.com/v0/b/twitter-clone-ec8f6.appspot.com/o/profilePics%2Fdefault%2FDefault_Image.jpg?alt=media&token=7231ff52-cf7e-49a7-aa31-d19f0fa99337",
      Bio: "",
    });
  };

  // logout button ---------------------

  const handleLogout = () => {
    console.log("Logging out. Going to login page.");
    window.location.pathname = "/login";
    fire.auth().signOut();
  };

  // check if user exists -----------------------

  // detects auth -----------------------

  //------------------------------------------------------------- Like

  const likePost = (itemDisplayLikes, itemDisplayId) => {
    console.log("Adding current user to Posts' Like List");
    itemsDB
      .doc(itemDisplayId)
      .update({ likes: [...itemDisplayLikes, authUser2] });
  };

  const unlikePost = (itemDisplayLikes, itemDisplayId) => {
    console.log(
      "Creating new Like List without current user and saving to Post Like List"
    );
    const newArray = itemDisplayLikes.filter(
      (currentUser) => currentUser !== authUser2
    );

    itemsDB.doc(itemDisplayId).update({ likes: newArray });
  };

  /////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <unlikeContext.Provider value={unlikePost}>
        <likeContext.Provider value={likePost}>
          {user ? (
            <React.Fragment>
              <Route path="/home">
                <div className="alvincontainer">
                  <div className="sidebar">
                    <Sidebar UID={UID} />
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
                  <div className="newscontainer">
                    <div className="news">
                      <News />
                    </div>
                  </div>
                </div>
              </Route>

              <Route path={"/profile/" + windowLocationState}>
                <div className="alvincontainer">
                  <div className="sidebar">
                    <Sidebar UID={UID} />
                  </div>

                  <div className="child2">
                    <Profile
                      authUser2={authUser2}
                      handleLogout={handleLogout}
                      user={user}
                      imgUrl={imgUrl}
                      setImgUrl={setImgUrl}
                      firstFunction={firstFunction}
                    />
                  </div>
                  <div className="newscontainer">
                    <div className="news">
                      <News />
                    </div>
                  </div>
                </div>
              </Route>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/login">
                <section className="split left">
                  <div className="centered">
                    <div className="blackbackgrounddiv">
                      <img
                        className="ravens"
                        src={ravensimg}
                        alt="background"
                      />
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
        </likeContext.Provider>
      </unlikeContext.Provider>
    </React.Fragment>
  );
};

export default App;
