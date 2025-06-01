import React, { useState } from "react";
import { StyledWrapper } from "./styles";
import GlobalStyle from "../../styles/global";
import { supabase } from "../../supabaseClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setMensagem("");

    if (!email.trim() || !password.trim()) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔍 Iniciando cadastro para:", email);

      // Usar apenas o Auth do Supabase - não mexer com a tabela users
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split("@")[0],
            display_name: username || email.split("@")[0],
          },
        },
      });

      console.log("🔍 Resultado do cadastro:", { data, error });

      if (error) {
        console.error("❌ Erro no cadastro:", error);
        setErro(`Erro no cadastro: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("✅ Usuário criado com sucesso:", data.user);
        setMensagem(
          "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar."
        );

        // Limpar campos
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setErro("Erro ao criar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("❌ Erro geral:", error);
      setErro(`Erro interno: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <GlobalStyle />
      <form className="form_main" onSubmit={handleSubmit}>
        <p className="heading">Cadastre-se</p>

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
            placeholder="Senha (mínimo 6 caracteres)"
            className="inputField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
        </div>

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

        <div className="signupContainer">
          <p>Já tem uma conta?</p>
          <a href="/login">Fazer login</a>
        </div>
      </form>
    </StyledWrapper>
  );
};

export default Register;
