import app from "../../firebase-config";
import { doc, getFirestore, getDoc } from "firebase/firestore";
const firestore = getFirestore();

export const readUser = async (docRef) => {
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const docData = snapshot.data();
    const stringData = JSON.stringify(docData);
    return JSON.parse(stringData);
  } else {
    return undefined;
  }
};

export const readBookDetails = async (isbn) => {
  const docRef = doc(firestore, `books/${isbn}`);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const docData = snapshot.data();
    const stringData = JSON.stringify(docData);
    return JSON.parse(stringData);
  } else {
    return undefined;
  }
};
