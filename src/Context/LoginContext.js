import { createContext } from "react";
import { http } from "../http";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const criarUsuario = (user) => {
    http
      .post("login/criarUsuario", { user })
      .then((response) => {
        window.location.href = '/index';
      })
      .catch((error) => {
        console.log(error);
      });
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
