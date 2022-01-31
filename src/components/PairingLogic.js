import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import app from "../../firebase-config";

async function bookRecs() {
  const firestore = getFirestore(); //connects to database
  const bookISBN = "9780007447862"; //using a static ISBN currently, can be passed on props
  const bookRef = doc(firestore, `books/${bookISBN}`); //get the document
  const bookSnap = await getDoc(bookRef); // get document data
  const bookVotes = bookSnap.data().drinkPairings; //drills to vote data

  const userRef = doc(firestore, `users/phone@test.com`);
  const userSnap = await getDoc(userRef);

  const alcoholUserDrinks =
    userSnap._document.data.value.mapValue.fields.drinksPrefs.mapValue.fields
      .alcoholPrefs.mapValue.fields;

  const alcoholList = Object.keys(alcoholUserDrinks);

  const noAlcoholUserDrinks =
    userSnap._document.data.value.mapValue.fields.drinksPrefs.mapValue.fields
      .noAlcoholPrefs.mapValue.fields;

  const noAlcoholList = Object.keys(noAlcoholUserDrinks);

  const drinkChoices = [];
  for (let i = 0; i < alcoholList.length; i++) {
    alcoholUserDrinks[alcoholList[i]].booleanValue
      ? drinkChoices.push(alcoholList[i])
      : null;
  }

  for (let i = 0; i < noAlcoholList.length; i++) {
    noAlcoholUserDrinks[noAlcoholList[i]].booleanValue
      ? drinkChoices.push(noAlcoholList[i])
      : null;
  }

  let firstRec = "";
  //   let secondRec = "";
  const userDrinkArray = [];

  for (let i = 0; i < drinkChoices.length; i++) {
    let drinkQuery = query(
      collection(firestore, `drinks`),
      where(drinkChoices[i], "==", true)
    );
    const drinkSnap = await getDocs(drinkQuery);
    drinkSnap.forEach((doc) => {
      userDrinkArray.push(doc.id);
    });
  }

  const userDrinkObject = {};

  userDrinkArray.forEach((drink) => {
    userDrinkObject[drink] = 0;
  });

  const userArray = Object.keys(bookVotes);

  for (let i = 0; i < userArray.length; i++) {
    let bookDrink = bookVotes[userArray[i]].drink;
    if (userDrinkObject.hasOwnProperty(bookDrink)) {
      userDrinkObject[bookDrink] += 1;
    }
  }

  //   let arr = Object.values(userDrinkObject);
  //   let highScore = Math.max(...arr);

  //   for (let drink in userDrinkObject) {
  //    firstRec ? userDrinkObject[drink] === highScore :
  //   }

  //   const checkObj = (obj) => {};

  //create an object will all the drinks a user would drink
  //eg drinksObj {beer:0 , wine:0 , ale:0}

  //read though all the book pairing votes and incriment the values for each vote
  // eg drinksObj {beer:1 , wine:0 , ale:1}

  //return the top 2 of the object
  //eg firstRec="beer" secondRec="ale"

  //if theres not enough return random ones

  //   return { firstRec, secondRec, userDrinkArray };
  return console.log("end", firstRec, userDrinkObject);
}

export default bookRecs;
