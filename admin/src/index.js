import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

import {getFirestore,collection,getDocs}from "firebase/firestore";
import app from '.firebase';

const db = getFirestore(app);
async function fetchData(params) {
  const querySnapshot = await getDocs(collection(db,"news"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id," => ",doc.data());
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

