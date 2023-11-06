import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Auth from "./views/Auth";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/auth" element={<Auth />}  />

          {/* Outras rotas */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
