import { getFirestore, doc, updateDoc } from "firebase/firestore";

async function addVotes() {
  const ISBN = 9780141035796;
  const username = "test@test.com";
  const firestore = getFirestore();
  const drink = "Pinot Noir Rosé";
  const userVote = { [username]: { drink: `${drink}` } };

  const docRef = doc(firestore, "books", `${ISBN}`);
  await updateDoc(docRef, {
    drinkPairings: userVote,
  });
}

export default addVotes;
