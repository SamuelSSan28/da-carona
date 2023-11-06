import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

const handleSendCode = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
            // O código de verificação foi enviado com sucesso.
            const verificationId = confirmationResult.verificationId;
            // Continue o processo com o código de verificação.
        })
        .catch((error) => {
            console.error(error);
        });
};

const handleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
            // O usuário está autenticado com sucesso.
            console.log("Usuário autenticado:", user);
        })
        .catch((error) => {
            console.error(error);
        });
};


export {
    handleSendCode,
    handleVerifyCode
}
