import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BarbaCabeloEBigode } from "../Pages/barbaCabeloEBigode";
import { AppProviders } from "./AppProvider";
import { FormCadastroAdm } from "../Pages/FormulariosLogin/FormCadastroAdm";
import { ConfirmarCodigo } from "../Pages/FormulariosLogin/ConfirmarCodigo";
import { Form } from "../Pages/FormulariosLogin/FormLogin";
import { TrocarSenha } from "../Pages/TrocarSenha";

export default function appRouter() {
  return (
    <Router>
      <AppProviders>
        {/* COMPONENTE AppProviders ENCAPSULA AS ROTAS COM OS PROVIDERS DOS CONTEXTS */}
        <Routes>
          <Route path="/" element={<BarbaCabeloEBigode />} />
          <Route path="/cadastro" element={<FormCadastroAdm />} />
          <Route
            path="/confirmarCodigo/:endpoint"
            element={<ConfirmarCodigo />}
          />
          <Route path="/login" element={<Form />} />
          <Route path="/redefinirSenha" element={<TrocarSenha/>} />

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route
            path="/:barbearia"
            element={<PaginaPadrao />}
          >
            <Route index element={<IndexRedireciona />} />

            <Route element={<RotasProtegida />}>
              <Route
                path="/:barbearia/agendamentos"
                element={<Agendamentos />}
              />
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
          <Route path="/notfound" element={<NotFound />} /> */}
        </Routes>
      </AppProviders>
    </Router>
  );
}
