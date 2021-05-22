const firebaseConfig = {
    apiKey: "AIzaSyB_yqeeUcy1MciBK3RDe6pusFfskQ56tMs",
    authDomain: "taller2-web-40ef9.firebaseapp.com",
    projectId: "taller2-web-40ef9",
    storageBucket: "taller2-web-40ef9.appspot.com",
    messagingSenderId: "121288523965",
    appId: "1:121288523965:web:cd2316c0df6282adbeb7d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const storage = firebase.storage();


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('onAuthStateChanged',user);

      db.collection('users').doc(user.uid).get().then(function(doc){
        console.log(doc.data());
      })
    } else {
      // User is signed out
      // ...
    }
  });