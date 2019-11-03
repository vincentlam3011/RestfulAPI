import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBRBs2KaI-Zi_QgEPaP0-PHIiXIq1Hac2Q",
    authDomain: "midterm-411a5.firebaseapp.com",
    databaseURL: "https://midterm-411a5.firebaseio.com",
    projectId: "midterm-411a5",
    storageBucket: "midterm-411a5.appspot.com",
    messagingSenderId: "13991529548",
    appId: "1:13991529548:web:c52484b367a20fcaa578e9"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export {
    storage, firebase as default
};