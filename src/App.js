import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLayoutEffect } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./services/firebaseAuth";
import Auth from "./views/Auth";
import Home from "./views/Home";
import Events from "./views/Events";

function App() {
  useLayoutEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      });
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <div id="sign-in-button" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />

          {/* Outras rotas */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
