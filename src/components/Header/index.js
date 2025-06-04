import React from "react";

const Header = ({ user, onLogout }) => {
  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      onLogout();
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#6041BF",
        borderBottom: "1px solid #dee2e6",
        marginBottom: "2rem",
      }}
    >
      <div>
        <h2 style={{ margin: 0, color: "#fff" }}>
          Bem-vindo, {user?.email || "Usuário"}!
        </h2>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.9rem", color: "#fff" }}>
          ID: {user?.id?.slice(0, 8)}...
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
