import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Principal from "./Pages/principal";
import LoginForm from "./Pages/login";
import Relatorio from "./Pages/relatorio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </Router>
  );
}

function LoginWrapper() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/principal");
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default App;
