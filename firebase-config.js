import firebaseConfig from "./api-key";

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

export default app;
