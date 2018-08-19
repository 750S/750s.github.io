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




// Client ID and API key from the Developer Console
var CLIENT_ID = '765237982504-fmpu7ubluouhpst9lmt3kflpihp99mct.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD9yuWh-tGCXVsjmuVjtFN_11X6BMjtrgM';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
var authorizeButton = document.getElementById('authorize_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signInForm.style.display = 'block';
    checkDate();
    //makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signInForm.style.display = 'none';
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}


function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

let dateInput = document.getElementById("date-input");
let meetingStart = document.getElementById("meeting-start-time-input");
let meetingEnd = document.getElementById("meeting-end-time-input");
let start = document.getElementById("start-time-input");
let end = document.getElementById("end-time-input");
let name = document.getElementById("name");

dateInput.addEventListener('change',checkDate);
name.addEventListener('change',checkDate);

let months = ((new Date()).getMonth()+1);
if(months<10)
  fmonths="0"+months;
else
  fmonths=""+months;

  let days = (new Date()).getDate();
  if(days<10)
    fdays="0"+days;
  else
    fdays=""+days;

dateInput.value = (new Date()).getFullYear()+"-"+fmonths+"-"+fdays;

let indexToChange = 0;
function checkDate() {
  var meetingDate = new Date(dateInput.value);
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1sk5Ag77kOqzJPPayTsg-UliUsGZomEZHKNqhdloBw3Y',
    range: 'Meetings!A1:D',
  }).then(function(response) {
    var range = response.result;
    console.log(range.values.length);
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        console.log(row[0]);
        if((new Date(row[0])).toLocaleDateString()==meetingDate.toLocaleDateString()){
          indexToChange=i+1;
          meetingStart.value=time(row[2]);
          meetingEnd.value=time(row[3]);
        }
      }
      if(indexToChange==0)
        indexToChange=i+1;
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
  if(name.value!="Select Name")
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1sk5Ag77kOqzJPPayTsg-UliUsGZomEZHKNqhdloBw3Y',
    range: name+'!E'+indexToChange+':F'+indexToChange,
  }).then(function(response) {
    var range = response.result;
    console.log(range.values.length);
        var row = range.values[0];
        console.log(row[0]);
        start.value=time(row[0]);
        end.value=time(row[1]);
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function timeHour(tim){
  var d = parseInt(tim.split(':')[0]);
  if(tim.includes("PM")||tim.includes("pm"))
    d+=12
  if(d<10)
    return "0"+d;
  return""+d;
}

function timeMin(tim){
  var d = parseInt(tim);
  if(d<10)
    return "0"+d;
  return""+d;
}

function time(tim){
  return timeHour(tim)+":"+timeMin(tim.split(':')[1].split(' ')[0]);
}

function makeApiCall() {
  var params = {
    spreadsheetId: '1sk5Ag77kOqzJPPayTsg-UliUsGZomEZHKNqhdloBw3Y',  // TODO: Update placeholder value.
    range: 'Meetings!A1:D1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
  };
  var d = new Date();
  var valueRangeBody = {
    "range": "Meetings!A1:D1",
    "majorDimension": "ROWS",
    "values": [
      [d.toLocaleDateString(), "to do stuff", d.getHours()+":"+d.getMinutes(), d.getHours()+":"+d.getMinutes()]
    ],
  };

  var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}
