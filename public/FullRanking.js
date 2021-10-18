// Setting up the required components from the web links
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
  constructor(name, points, head, colour, rank){ //Has the following properties
    this.name = name;
    this.points = points;
    this.head = head;
    this.colour = colour;
    this.rank = rank;
  }
}

console.log(db);

// getting the data from a collection called "Houses"
const querySnapshot = await getDocs(collection(db, "Houses")); //Querying for the collection called "Houses"
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data().points);
  let rank;
  let tempHouses = [];
  tempHouses.push()
  houses.push(new House(doc.id, doc.data().points, doc.data().head, doc.data().colour), rank); //Putting database info into the local array
  console.log(houses);
});

function pointDisplay(){ //Displays the point record table
  for(let i in houses){
    let tbl = document.getElementById("pointsTable");
    let rowNumber = tbl.rows.length;
    let row = tbl.insertRow(rowNumber);
    let hCell = row.insertCell(0); //House name column
    let pCell = row.insertCell(1); //Total points column
    let rCell = row.insertCell(2); //Rank column
    //Accessing info
    hCell.innerHTML = houses[i].house;
    pCell.innerHTML = houses[i].points;
    rCell.innerHTML = houses[i].rank;
  }
  console.log(houses);
}

pointDisplay();
