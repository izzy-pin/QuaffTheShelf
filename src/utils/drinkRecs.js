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

async function drinkRecs(email, isbn) {
  console.log("from drinkRecs", email, isbn);
  let firstRec = "";
  let secondRec = "";
  const userDrinkArray = [];
  const firestore = getFirestore();

  const bookRef = doc(firestore, `books/${isbn}`);
  const bookSnap = await getDoc(bookRef);
  const bookVotes = bookSnap.data().drinkPairings;

  const userRef = doc(firestore, `users/${email}`);
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

  if (bookVotes) {
    const userArray = Object.keys(bookVotes);

    for (let i = 0; i < userArray.length; i++) {
      let bookDrink = bookVotes[userArray[i]].drink;
      if (userDrinkObject.hasOwnProperty(bookDrink)) {
        userDrinkObject[bookDrink] += 1;
      }
    }

    let findHighestScore = Object.values(userDrinkObject);
    let highScore = Math.max(...findHighestScore);

    for (let drink in userDrinkObject) {
      if (userDrinkObject[drink] === highScore && !firstRec) {
        firstRec = drink;
        userDrinkObject[drink] = 0;
      }
    }

    findHighestScore = Object.values(userDrinkObject);
    highScore = Math.max(...findHighestScore);

    for (let drink in userDrinkObject) {
      if (userDrinkObject[drink] === highScore) {
        secondRec = drink;
        userDrinkObject[drink] = 0;
      }
    }
  } else {
    firstRec =
      userDrinkArray[Math.floor(Math.random() * userDrinkArray.length + 1)];
    secondRec =
      userDrinkArray[Math.floor(Math.random() * userDrinkArray.length + 1)];
  }

  return { firstRec, secondRec, userDrinkArray };
}

export default drinkRecs;
