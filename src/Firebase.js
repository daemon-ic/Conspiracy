import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDQc3O7BAMkM1FWLSxlQly3zzq8dcz49g8",
  authDomain: "twitter-clone-ec8f6.firebaseapp.com",
  databaseURL: "https://twitter-clone-ec8f6.firebaseio.com",
  projectId: "twitter-clone-ec8f6",
  storageBucket: "twitter-clone-ec8f6.appspot.com",
  messagingSenderId: "642264567872",
  appId: "1:642264567872:web:cce1eb507327ed97ed4fa5"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;