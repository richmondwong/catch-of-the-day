import Rebase from "re-base"
import firebase from "firebase"
// import firebase from "firebase/app"

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAPkM8Og0kpu3Lw2wiUATs7mDgTyyTs2hE",
    authDomain: "catch-of-the-day-rw.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-rw.firebaseio.com",
  })

var base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }
export default base
