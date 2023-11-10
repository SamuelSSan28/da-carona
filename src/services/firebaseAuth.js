import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();
const firestore = getFirestore(firebaseApp);

const sendSMSCode = async (phone) => {
  try {
    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      appVerifier
    );

    return confirmationResult;
  } catch (error) {
    console.error("Erro ao registrar:", error);
  }
};

const handleLogin = async (verificationCode, confirmationResult) => {
  try {
    await confirmationResult.confirm(verificationCode);
    window.location.href = "/eventos";
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};

const handleRegister = async (
  name,
  phone,
  confirmationResult,
  verificationCode
) => {
  try {
    const userCredential = await confirmationResult.confirm(verificationCode);

    if (!userCredential?.user?.uid) {
      return;
    }

    const docRef = doc(firestore, "users", userCredential.user.uid);

    await setDoc(docRef, { name, phone }, { merge: true });

    window.location.href = "/eventos";
  } catch (error) {
    console.error("Erro ao registrar:", error);
  }
};

const createEvent = async (title, date, hour, location, user) => {
  try {
    const docRef = doc(firestore, "events", uuidv4());

    await setDoc(
      docRef,
      { title, date, hour, location, user },
      { merge: true }
    );

  } catch (error) {
    console.error("Erro ao salvar evento:", error);
  }
};

const getEvents = async (dateStart,dateEnd) => {
  const eventssRef = collection(firestore, "events");

  // Create a query against the collection.
  const q = query(eventssRef, where("state", "==", "CA"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

export { auth, handleLogin, handleRegister, sendSMSCode, createEvent, getEvents };
