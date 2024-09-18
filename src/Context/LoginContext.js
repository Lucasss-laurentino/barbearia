import { createContext } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const criarUsuario = async (user) => {
    try {
      http.post("login/criarUsuario", { user });
      navigate("/index")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        criarUsuario,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
