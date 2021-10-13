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
}

console.log(db);

// getting the data from a collection called "Houses"
const querySnapshot = await getDocs(collection(db, "Houses"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data().points);
  houses.push(new House(doc.data().name, doc.data().points, doc.data().head));
  console.log(houses);
});


function charCreate(){
  //Getting the entry values from the form
  let frm = document.getElementById("form");
  let name = frm.elements["charName"].value;
  let age = frm.elements["charAge"].value;
  let gender = frm.elements["charGender"].value;
  let personality = frm.elements["charPersonality"].value;
  let ethnicity = frm.elements["charEthnicity"].value;
  let description = document.getElementById("charDescription").value;
  //Creating a new character to the characters array
  characters.push(new Character(name, age, gender, personality, ethnicity, description));
  localStorage.setItem("characters", JSON.stringify(characters));
  document.getElementById("entryForm").style.visibility = "hidden";
  location.reload();
}
