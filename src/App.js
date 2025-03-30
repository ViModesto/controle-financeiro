// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Principal from "./Pages/principal";
// import LoginForm from "./Pages/login"; // Importando a tela de login

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rota para o Login (inicial) */}
//         <Route path="/" element={<LoginForm />} />

//         {/* Rota para a Página Principal */}
//         <Route path="/principal" element={<Principal />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Principal from "./Pages/principal";
// import LoginForm from "./Pages/login";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rota inicial: Tela de Login */}
//         <Route path="/" element={<LoginForm />} />

//         {/* Página Principal */}
//         <Route path="/principal" element={<Principal />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Principal from "./Pages/principal";
import LoginForm from "./Pages/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Tela de Login será a primeira a ser exibida */}
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}

/* Componente que adiciona navegação ao Login */
function LoginWrapper() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/principal"); // Redireciona para a página principal
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default App;

