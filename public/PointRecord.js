// Setting up the required components from the web links
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


// setting up my web app framework - use your apiKey and info
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBO8MS08E0qXXfbfEVa73xlqdXqzheQXsU',
  authDomain: 'housepointstracker.firebaseapp.com',
  projectId: 'housepointstracker'
});

// setting up the fireStore database
const db = getFirestore();
let houses = [];

class House{ //Creating a custom class called "House"
  constructor(name, points, head){ //Has the following properties
    this.name = name;
    this.points = points;
    this.head = head;
  }
  addPoints(points){
    this.points += points; //Add points to total
  }
  delPoints(points){
    this.points -= points; //Take away points from total
  }
  reset(){
    this.points = 0; //Reset point number to 0
  }
}

console.log(db);

// getting the data from a collection called "Houses"
const querySnapshot = await getDocs(collection(db, "Houses")); //Querying for the collection called "Houses"
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data().points);
  houses.push(new House(doc.data().name, doc.data().points, doc.data().head)); //Putting database info into the local array
  console.log(houses);
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

function addPoints(){
  let frm = document.getElementById(form);
  let houseName = frm.elements["house"].value;
  let pAdd = frm.elements["pointsAdded"].value;
  let oldPoints;
  //Adding points to the right house
  let house = db.collection("Houses").doc(houseName); //Saving the right document into a variable
  house.get().then(function(doc) { //Retrieves the data from the document
    if(doc.exists){ //If the document you're selecting even exists in the collection
      oldPoints = doc.data().points; //Saves data from the database into a new variable
      db.collection("Houses").doc(houseName).set(
        //Changes the data in the database, adding the data we got from the form to the one from the database
        {name: houseName, points: oldPoints + pAdd}
      )
    }else{
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  document.getElementById("pointsForm").style.visibility = "hidden";
}

function showPointsForm(){
  document.getElementById("pointsForm").style.visibility = "visible";
}

function cancelAdd(){
  document.getElementById("pointsForm").style.visibility = "hidden";
}
