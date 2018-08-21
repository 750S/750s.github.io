firebase.initializeApp({apiKey: "AIzaSyCoG_una82nRQEDDwlnLS2Br_fLlEolNeM",authDomain: "sparks-750.firebaseapp.com",databaseURL: "https://sparks-750.firebaseio.com",projectId: "sparks-750",storageBucket: "",messagingSenderId: "765237982504"});
var provider = new firebase.auth.GoogleAuthProvider();
//firebase.auth().languageCode = 'pt';

let signInBtn = document.getElementById("sign-in");

signInBtn.addEventListener("click", function(){
    firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("SIGNED IN");
    let validUser = false;
    firebase.database().ref('Authorized Members').on('value', function(snapshot) {
      for (var i in snapshot.val() )
        if(snapshot.val()[i]==user.email){
          validUser = true;
          break;
        }
      console.log(validUser);
      if(validUser){
        window.location.href = "https://750s.github.io/TeamInfo";
      }else{
        $("#notauthorized").slideDown(500).delay( 3000 ).slideUp(500);
        firebase.auth().signOut();
      }
    });
  }else{
    console.log("SIGNED OUT");
  }
});

firebase.database().ref('Authorized Members').update({

});
