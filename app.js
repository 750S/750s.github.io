firebase.initializeApp({apiKey: "AIzaSyCoG_una82nRQEDDwlnLS2Br_fLlEolNeM",authDomain: "sparks-750.firebaseapp.com",databaseURL: "https://sparks-750.firebaseio.com",projectId: "sparks-750",storageBucket: "",messagingSenderId: "765237982504"});
var provider = new firebase.auth.GoogleAuthProvider();
//firebase.auth().languageCode = 'pt';

let signInBtn = document.getElementById("sign-in");
let modalBtn =document.getElementById("navbarBtn");
let modalLink =document.getElementById("navbarLink");

console.log("TEST");
signInBtn.addEventListener("click", function(){
    firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("SIGNED IN");
    let validUser = false;
    firebase.database().ref('Authorized Members').on('value', function(snapshot) {
      for (var i in snapshot.val() )
        if(snapshot.val()[i]){
          validUser = true;
          break;
        }
      if(validUser){
        window.location.href = "file:///C:/Users/karth/Documents/GitHub/750s/TeamInfo/index.html";
      }else{

      }
    });
  }else{
    console.log("SIGNED OUT");
    modalBtn.innerHTML = "For Team Members only";
  }
});

firebase.database().ref('Authorized Members').update({

});
