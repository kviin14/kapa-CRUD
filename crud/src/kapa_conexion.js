import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
 

 
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCTK0f7QZyaG9uOsslDKPewoyhrftwHMnU",
  authDomain: "crud-kapa.firebaseapp.com",
  databaseURL: "https://crud-kapa-default-rtdb.firebaseio.com",
  projectId: "crud-kapa",
  storageBucket: "crud-kapa.appspot.com",
  messagingSenderId: "462085562179",
  appId: "1:462085562179:web:d9971d25d61ffeef2559f6"
};

// Initialize Firebase
var conexion=firebase.initializeApp(firebaseConfig);
export default firebase.database().ref();