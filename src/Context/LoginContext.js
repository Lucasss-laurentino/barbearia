import { createContext, useContext } from "react";
import { http } from "../http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const criarUsuario = async (user) => {
    try {
      const response = await http.post(
        "login/criarUsuario",
        { user },
        { withCredentials: true }
      );
      setUser(response.data.user);
      navigate("/index");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    try {
      await http
        .post("/login/login", { user }, { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          navigate("/index");
        });
    } catch (error) {}
  };

  return (
    <LoginContext.Provider
      value={{
        criarUsuario,
        login,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
