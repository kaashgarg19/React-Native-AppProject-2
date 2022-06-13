import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBI1HfG9epGJyOAsfZhnRQZqjsjNXS03B4",
    authDomain: "giftapp-53f01.firebaseapp.com",
    databaseURL: "https://giftapp-53f01.firebaseio.com",
    projectId: "giftapp-53f01",
    storageBucket: "giftapp-53f01.appspot.com",
    messagingSenderId: "157878595034",
    appId: "1:157878595034:web:c1b895faeff8125bed64e3"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export default Firebase