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
  constructor(name, points, head, colour){ //Has the following properties
    this.name = name;
    this.points = points;
    this.head = head;
    this.colour = colour;
  }
  changeColour(colour){
    this.colour = colour;
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

houses.sort((a, b) => b.points - a.points);

for(let i in houses){
  if(houses[i].colour == "black & white"){

  }else if(houses[i].colour == "purple"){

  }else if(houses[i].colour == "red"){

  }else if(houses[i].colour == "brown"){

  }else if(houses[i].colour == "silver & gold"){

  }else if(houses[i].colour == "yellow"){

  }else if(houses[i].colour == "pink"){

  }else if(houses[i].colour == "blue"){

  }else if(houses[i].colour == "light blue"){

  }else if(houses[i].colour == "plaid"){

  }else if(houses[i].colour == "orange"){

  }else if(houses[i].colour == "green"){

  }
}

function pointDisplay(){ //Displays the data in the podium
  let first = document.getElementById("first");
  let second = document.getElementById("second");
  let third = document.getElementById("third");
  //Accessing info
  first.innerHTML = houses[0].name;
  second.innerHTML = houses[1].name;
  third.innerHTML = houses[2].name;
  document.getElementById("pedestal_1").style.backgroundColor = houses[0].colour;
  document.getElementById("pedestal_2").style.backgroundColor = houses[1].colour;
  document.getElementById("pedestal_3").style.backgroundColor = houses[2].colour;
}

pointDisplay();
