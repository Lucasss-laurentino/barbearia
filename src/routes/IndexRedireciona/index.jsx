// src/pages/IndexRedirect.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export const IndexRedireciona = () => {
  const { user, verificandoUsuarioLogado } = useContext(UserContext);
  const navigate = useNavigate();
  const { barbearia } = useParams();

  useEffect(() => {
    if (!verificandoUsuarioLogado) return;

    if (user?.ADM) {
      navigate(`/${barbearia}/agendamentos`, { replace: true });
    } else {
      navigate(`/${barbearia}/servicos`, { replace: true });
    }
  }, [user, verificandoUsuarioLogado, barbearia]);

  return null;
};
