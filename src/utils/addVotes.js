import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

async function addVotes() {
  const ISBN = 9780141035796;
  const username = "phone@test.com";
  const firestore = getFirestore();
  const drink = "Amstel";

  const readDocRef = doc(firestore, `books/${ISBN}`);
  const book = await getDoc(readDocRef);

  const drinkPairings = book.get("drinkPairings");

  const newDrinkPairings = {
    [username]: { drink: `${drink}` },
    ...drinkPairings,
  };
  console.log(newDrinkPairings);

  const updateDocRef = doc(firestore, "books", `${ISBN}`);
  await updateDoc(updateDocRef, { drinkPairings: newDrinkPairings });
}
export default addVotes;
