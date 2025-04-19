import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound } from "../Components/NotFound";
import { AvisoPagamentoAtrasado } from "../Components/AvisoPagamentoAtrasado";
import { AtivarAssinatura } from "../Components/AtivarAssinatura";
import { Finalizados } from "../Components/Finalizados";
import { EditarUser } from "../Components/EditarUser";
import { EditarSenha } from "../Components/EditarSenha";
import { MeusHorarios } from "../Components/MeusHorarios";
import { Barbeiros } from "../Pages/Barbeiros";
import { Agendamentos } from "../Pages/Agendamentos";
import { Servicos } from "../Pages/Servicos";
import { PaginaPadrao } from "../Pages/PaginaPadrao";
import { BarbaCabeloEBigode } from "../Pages/barbaCabeloEBigode";
import { Login } from "../Pages/Login";
import { AppProviders } from "./AppProvider";
import { RotasProtegida } from "./RotasProtegida";
import { IndexRedireciona } from "./IndexRedireciona";

export default function appRouter() {
  return (
    <Router>
      <AppProviders>
        {" "}
        {/* COMPONENTE AppProviders ENCAPSULA AS ROTAS COM OS PROVIDERS DOS CONTEXTS */}
        <Routes>
          <Route path="/" element={<BarbaCabeloEBigode />} />

          <Route path="/login/:plano_id" element={<Login />} />

          <Route path="/:barbearia" element={<PaginaPadrao />}>
            <Route index element={<IndexRedireciona />} />

            <Route element={<RotasProtegida />}>
              <Route path="/:barbearia/agendamentos" element={<Agendamentos />}/>
              <Route path="/:barbearia/financeiro" element={<Finalizados />} />
            </Route>

            <Route path="/:barbearia/servicos" element={<Servicos />} />
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
