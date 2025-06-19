import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export function RotaPrivadaAdm({ children }) {
  const { usuario } = useContext(UserContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!usuario.adm) {
    return <Navigate to="/" />;
  }

  return children;
}
