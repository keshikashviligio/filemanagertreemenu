import React from 'react';
import firebase from "firebase";
import './App.css';
import TreeMenuContainer from "./containers/treeMenuContainer/TreeMenuContainer";

const firebaseConfig = {
  apiKey: "AIzaSyBJFZ8YRG602awzGz7ocGSlw25-FsAvCrU",
  authDomain: "interview-tree-menu.firebaseapp.com",
  databaseURL: "https://interview-tree-menu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "interview-tree-menu",
  storageBucket: "interview-tree-menu.appspot.com",
  messagingSenderId: "240700809587",
  appId: "1:240700809587:web:d2665dbd2be6d1c4772506",
  measurementId: "G-SW46Z8S1Z0"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <TreeMenuContainer />
  )
}

export default App;
