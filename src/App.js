import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./services/firebase";
import Auth from "./views/Auth";
import Home from "./views/Home";
import Events from "./views/Events";
import { UserContext } from "./context/user";
import CreateEvent from "./views/CreateEvent";
import EventDetails from "./views/EventDetails";

function App() {
  const { token } = useContext(UserContext);

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
    <div className="App" style={{ background: "#F7FAFC", height: "100vh" }}>
      {!!token ? <Header /> : null}

      <div id="sign-in-button" />
      <Router>
        <Routes>
          {!!token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Auth />} />
            </>
          )}

          {/* Outras rotas */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
