// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_K8eF00Mb41lxKWUQdNIbF3I56CSsTDE",
    authDomain: "omni-hiring.firebaseapp.com",
    projectId: "omni-hiring",
    storageBucket: "omni-hiring.appspot.com",
    messagingSenderId: "31394066573",
    appId: "1:31394066573:web:338ded3acb20ea210032c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()

export {db, auth}