import { signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";

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
    const result = await confirmationResult.confirm(verificationCode);

    return result;
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

    return userCredential.user.uid;
  } catch (error) {
    console.error("Erro ao registrar:", error);
  }
};

export { handleLogin, handleRegister, sendSMSCode };
