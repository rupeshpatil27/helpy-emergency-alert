import * as react from 'react'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default ()=>{
      return{firebase,auth,firestore,messaging}
  }