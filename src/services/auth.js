import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";

const sendSMSCode = async (phone) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        console.log("response",response)
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });
  }

  const appVerifier = window.recaptchaVerifier;

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    appVerifier
  );

  return confirmationResult;
};

const handleLogin = async (verificationCode, confirmationResult) => {
  const result = await confirmationResult.confirm(verificationCode);

  return result;
};

const handleRegister = async (
  name,
  phone,
  confirmationResult,
  verificationCode
) => {
  const userCredential = await confirmationResult.confirm(verificationCode);

  if (!userCredential?.user?.uid) {
    return;
  }

  const docRef = doc(firestore, "users", userCredential.user.uid);

  await setDoc(docRef, { name, phone }, { merge: true });

  return userCredential.user.uid;
};

export { handleLogin, handleRegister, sendSMSCode };
