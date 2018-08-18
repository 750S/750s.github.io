firebase.initializeApp({apiKey: "AIzaSyCoG_una82nRQEDDwlnLS2Br_fLlEolNeM",authDomain: "sparks-750.firebaseapp.com",databaseURL: "https://sparks-750.firebaseio.com",projectId: "sparks-750",storageBucket: "",messagingSenderId: "765237982504"});
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'pt';

let signInBtn = document.getElementById("sign-in");


console.log("TEST");
signInBtn.addEventHandler("click", function(){
    firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("SIGNED IN");
  }else{
    console.log("SIGNED OUT");
  }
});
