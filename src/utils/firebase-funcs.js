import { getDoc } from "firebase/firestore";

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
