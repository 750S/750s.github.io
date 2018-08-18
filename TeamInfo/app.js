firebase.initializeApp({apiKey: "AIzaSyCoG_una82nRQEDDwlnLS2Br_fLlEolNeM",authDomain: "sparks-750.firebaseapp.com",databaseURL: "https://sparks-750.firebaseio.com",projectId: "sparks-750",storageBucket: "",messagingSenderId: "765237982504"});

let signOutBtn = document.getElementById("sign-out");

signOutBtn.addEventListener("click", function(){
    firebase.auth().signOut();
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

      }else{
        $("#notauthorized").slideDown(100,function(){
          $("#notauthorized").slideUp(100);
        });
        firebase.auth().signOut();
        window.location.href = "https://750s.github.io/";
      }
    });
  }else{
    console.log("SIGNED OUT");
    //window.location.href = "https://750s.github.io/";
  }
});
