import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound } from "../Components/NotFound";
import { LandingPage } from "../Components/LandingPage";
import { Login } from "../Components/Login";
import { AvisoPagamentoAtrasado } from "../Components/AvisoPagamentoAtrasado";
import { AtivarAssinatura } from "../Components/AtivarAssinatura";
import { PageDefault } from "../Components/PageDefault";
import { ListService } from "../Components/ListServices";
import { Horarios } from "../Components/Horarios";
import { Finalizados } from "../Components/Finalizados";
import { EditarUser } from "../Components/EditarUser";
import { Barbeiros } from "../Components/Barbeiros";
import { EditarSenha } from "../Components/EditarSenha";
import { MeusHorarios } from "../Components/MeusHorarios";
import { AppProviders } from "../Components/AppProvider";

export default function appRouter() {
  return (
    <Router>
      <AppProviders> {/* COMPONENTE AppProviders ENCAPSULA AS ROTAS COM OS PROVIDERS DOS CONTEXTS */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:plano_id" element={<Login />} />
          <Route path="/:barbearia" element={<PageDefault />}>
            <Route path="/:barbearia/servicos" element={<ListService />} />
            <Route path="/:barbearia/agendamentos" element={<Horarios />} />
            <Route path="/:barbearia/financeiro" element={<Finalizados />} />
            <Route path="/:barbearia/barbeiros" element={<Barbeiros />} />
            <Route path="/:barbearia/editarconta" element={<EditarUser />} />
            <Route path="/:barbearia/meusHorarios" element={<MeusHorarios />} />
          </Route>
          <Route path="/alterarSenha" element={<EditarSenha />} />
          <Route path="/:barbearia/login" element={<Login />} />
          <Route
            path="/:barbearia/assinaturabloqueada"
            element={<AvisoPagamentoAtrasado />}
          />
          <Route
            path="/:barbearia/assinaturadesativada"
            element={<AtivarAssinatura />}
          />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </AppProviders>
    </Router>
  );
}
