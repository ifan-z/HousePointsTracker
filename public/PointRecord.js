// Setting up the required components from the web links
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// setting up my web app framework - use your apiKey and info
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBO8MS08E0qXXfbfEVa73xlqdXqzheQXsU',
  authDomain: 'housepointstracker.firebaseapp.com',
  projectId: 'housepointstracker'
});

// setting up the fireStore database
const db = getFirestore();
let houses = [];
let pointRecord = [];

class House{ //Creating a custom class called "House"
  constructor(name, points, head, colour){ //Has the following properties
    this.name = name;
    this.points = points;
    this.head = head;
    this.colour = colour;
  }
  addPoints(points){
    this.points += points; //Add points to total
  }
  delPoints(points){
    this.points -= points; //Take away points from total
  }
}

class Record{
  constructor(house, user, points, date, description){
    this.house = house;
    this.user = user;
    this.points = points;
    this.date = date;
    this.description = description;
  }
}

console.log(db);

// getting the data from a collection called "Houses"
const querySnapshot = await getDocs(collection(db, "Houses")); //Querying for the collection called "Houses"
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data().points);
  houses.push(new House(doc.id, doc.data().points, doc.data().head, doc.data().colour)); //Putting database info into the local array
  console.log(houses);
});

// getting the data from a collection called "PointRecord"
const querySnapshotRecord = await getDocs(collection(db, "PointRecord")); //Querying for the collection called "PointRecord"
querySnapshotRecord.forEach((doc) => {
  pointRecord.push(new Record(doc.data().house, doc.data().name, doc.data().pointsAdded, doc.data().date, doc.data().description));
  console.log(pointRecord);
});

for(let i = 0; i < 12; i++){
  addHouses(houses[i].name); //Add houses to dropdown menu of form
}

function addHouses(name){ //Function to add a house to the dropdown menu in the form
  let x = document.getElementById("house");
  let option = document.createElement("option");
  option.text = name;
  x.add(option);
}

document.getElementById("showPointsForm").onclick = function() {
  document.getElementById("pointsForm").style.visibility = "visible";
}

document.getElementById("cancelPoints").onclick = function() {
  document.getElementById("pointsForm").style.visibility = "hidden";
}

document.getElementById("submitPoints").onclick = function() {
  let frm = document.getElementById("form");
  let houseName = frm.elements["house"].value;
  let pAdd = Number(frm.elements["pointsAdded"].value);
  let pointDescription = frm.elements["pointDescription"].value;
  let oldPoints;
  //Adding points to the right house
  const docRef = doc(db, "Houses", houseName);
  const house = await getDoc(docRef); //Saving the right document into a variable
  house.get().then(function(doc) { //Retrieves the data from the document
    if(doc.exists){ //If the document you're selecting even exists in the collection
      oldPoints = doc.data().points; //Saves data from the database into a new variable
      updateDoc(house, {
        points: oldPoints + pAdd
      });
    }else{
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  // Add a new document in collection "PointRecord"
  setDoc(doc(db, "PointRecord", "user"), {
    date: new Date(),
    description: pointDescription,
    pointsAdded: pAdd,
    house: houseName,
    name: "user"
    //name: displayName;
  });
  //Adding the entry to the database

  document.getElementById("pointsForm").style.visibility = "hidden";
}

//Getting current signed in user
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}

function pointDisplay(){ //Displays the point record table
  for(let i in pointRecord){
    let tbl = document.getElementById("pointsTable");
    let rowNumber = tbl.rows.length;
    let row = tbl.insertRow(rowNumber);
    let hCell = row.insertCell(0); //House name column
    let nCell = row.insertCell(1); //Point giver name column
    let pCell = row.insertCell(2); //Number of points column
    let daCell = row.insertCell(3); //Date column
    let deCell = row.insertCell(4); //Description column
    let delCell = row.insertCell(5); //Delete column
    //Accessing info
    hCell.innerHTML = pointRecord[i].house;
    nCell.innerHTML = pointRecord[i].user;
    pCell.innerHTML = pointRecord[i].points;
    deCell.innerHTML = pointRecord[i].description;
    daCell.innerHTML = pointRecord[i].date;
    //Creating delete button
    let deleteButton = document.createElement("BUTTON");
    let dt = document.createTextNode("X");
    deleteButton.appendChild(dt);
    //Delete action wrapped in second function so that it does not automatically trigger
    deleteButton.addEventListener("click", function(){
      //houses[rowNumber-1].deleteEntry(rowNumber-1);
    });
    delCell.appendChild(deleteButton);
  }
  console.log(pointRecord);
}

pointDisplay();
