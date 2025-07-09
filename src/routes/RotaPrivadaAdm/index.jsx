import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Load } from "../../Components/Load";

export function RotaPrivadaAdm({ children }) {
  const { usuario, carregado } = useContext(UserContext);

  if(!carregado) {
    return <Load/>
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!usuario.adm) {
    return <Navigate to="/" />;
  }

  return children;
}
