import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, Outlet, useParams } from "react-router-dom";

export const RotasProtegida = () => {
  const { user, pegarUsuario, verificandoUsuarioLogado } =
    useContext(UserContext);
  const { barbearia } = useParams();

  useEffect(() => {
    pegarUsuario();
  }, []);

  if (!verificandoUsuarioLogado) return null;

  return user?.ADM ? (
    <Outlet />
  ) : (
    <Navigate to={`/${barbearia}/servicos`} replace />
  );
};
