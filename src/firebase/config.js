import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA-AJMkah7e2NnIWCABStr2TLNguoxsIgM",
    authDomain: "sergio-s-recipe-book.firebaseapp.com",
    projectId: "sergio-s-recipe-book",
    storageBucket: "sergio-s-recipe-book.appspot.com",
    messagingSenderId: "365586437333",
    appId: "1:365586437333:web:cdd21214445ab44f913e5c"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }