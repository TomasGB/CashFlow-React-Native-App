import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "your apiKey",
    authDomain: "your authDomain",
    projectId: "your projectId",
    storageBucket: "your storageBucket",
    messagingSenderId: "your messagingSenderId",
    appId: "your appId",
    measurementId: "your measurementId",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.default.auth();

export default {
    firebase,
    db,
    auth,
};
