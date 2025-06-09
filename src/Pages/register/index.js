import React, { useState } from "react";
import { StyledWrapper } from "./styles";
import GlobalStyle from "../../styles/global";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setMensagem("");
    setDebugInfo("");

    if (!email.trim() || !password.trim()) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔍 Iniciando cadastro para:", email);
      setDebugInfo("Iniciando cadastro...");

      // 1. Primeiro, vamos testar a conexão com o Supabase
      const { data: testData, error: testError } = await supabase
        .from("users")
        .select("count", { count: "exact" });

      console.log("🔍 Teste de conexão:", { testData, testError });

      if (testError) {
        console.error("❌ Erro na conexão:", testError);
        setErro(`Erro de conexão: ${testError.message}`);
        setLoading(false);
        return;
      }

      setDebugInfo("Conexão OK. Criando usuário no Auth...");

      // 2. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: username || email.split("@")[0],
          },
        },
      });

      console.log("🔍 Resultado do Auth:", { authData, authError });

      if (authError) {
        console.error("❌ Erro no auth:", authError);
        setErro(`Erro no cadastro: ${authError.message}`);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        console.error("❌ Usuário não foi criado no auth");
        setErro("Usuário não foi criado. Tente novamente.");
        setLoading(false);
        return;
      }

      setDebugInfo("Usuário criado no Auth. Inserindo na tabela users...");

      // 3. Inserir na tabela users manualmente
      const userToInsert = {
        id: authData.user.id,
        email: authData.user.email,
        password_hash: password,
        name: username || email.split("@")[0],
        created_at: new Date().toISOString(),
      };

      console.log("🔍 Dados para inserir:", userToInsert);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([userToInsert])
        .select();

      console.log("🔍 Resultado da inserção:", { userData, userError });

      if (userError) {
        console.error("❌ Erro ao inserir na tabela users:", userError);
        setErro(`Erro ao criar perfil: ${userError.message}`);

        // Tentar fazer rollback do auth (opcional)
        try {
          await supabase.auth.signOut();
        } catch (rollbackError) {
          console.error("Erro no rollback:", rollbackError);
        }

        setLoading(false);
        return;
      }

      console.log("✅ Cadastro completo com sucesso!");
      setMensagem(
        "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar."
      );
      setDebugInfo("Cadastro completo!");

      // Limpar campos
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      console.error("❌ Erro geral:", error);
      setErro(`Erro interno: ${error.message}`);
      setDebugInfo(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // // Função para testar conexão
  // const testConnection = async () => {
  //   try {
  //     const { data, error } = await supabase.from("users").select("*").limit(1);

  //     console.log("Teste de conexão:", { data, error });
  //     alert(`Conexão: ${error ? "FALHOU - " + error.message : "OK"}`);
  //   } catch (err) {
  //     console.error("Erro no teste:", err);
  //     alert(`Erro no teste: ${err.message}`);
  //   }
  // };

  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <GlobalStyle />
      <form className="form_main" onSubmit={handleSubmit}>
        <p className="heading">Cadastre-se</p>

        {/* Botão de teste - remover em produção
        <button
          type="button"
          onClick={testConnection}
          style={{
            marginBottom: "10px",
            padding: "5px 10px",
            fontSize: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Testar Conexão
        </button> */}

        <div className="inputContainer">
          <input
            placeholder="Username (opcional)"
            className="inputField"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="inputContainer">
          <input
            placeholder="Email"
            className="inputField"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="inputContainer">
          <input
            placeholder="Senha"
            className="inputField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {debugInfo && (
          <p style={{ color: "blue", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Debug: {debugInfo}
          </p>
        )}

        {erro && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {erro}
          </p>
        )}

        {mensagem && (
          <p
            style={{ color: "green", fontSize: "0.9rem", marginTop: "0.5rem" }}
          >
            {mensagem}
          </p>
        )}

        <button id="button" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {/* <div className="signupContainer"> */}
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              marginTop: "10px",
              padding: "0px 15px",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: "#8b5cf6", // ou "#9333ea" - cor roxa/violeta
              color: "#ffffff",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none",
              display: "inline-block",
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#7c3aed"; // tom mais escuro no hover
              e.target.style.transform = "translateY(5px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#8b5cf6";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Voltar para o Login
          </button>
        {/* </div> */}
      </form>
    </StyledWrapper>
  );
};

export default Register;
