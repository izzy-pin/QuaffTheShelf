import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

async function addVotes(user, ISBN, drink) {
  const firestore = getFirestore();

  const readDocRef = doc(firestore, `books/${ISBN}`);
  const book = await getDoc(readDocRef);

  const drinkPairings = book.get("drinkPairings");

  const newDrinkPairings = {
    [user]: { drink: `${drink}` },
    ...drinkPairings,
  };
  console.log(newDrinkPairings);

  const updateDocRef = doc(firestore, "books", `${ISBN}`);
  await updateDoc(updateDocRef, { drinkPairings: newDrinkPairings });
}
export default addVotes;
