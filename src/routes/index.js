import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BarbaCabeloEBigode } from "../Pages/barbaCabeloEBigode";
import { AppProviders } from "./AppProvider";
import { FormCadastroAdm } from "../Pages/FormulariosLogin/FormCadastroAdm";
import { ConfirmarCodigo } from "../Pages/FormulariosLogin/ConfirmarCodigo";
import { Form } from "../Pages/FormulariosLogin/FormLogin";
import { TrocarSenha } from "../Pages/TrocarSenha";
import { Agendamentos } from "../Pages/Agendamentos";
import { LayoutPadraoFormularios } from "../Components/LayoutPadraoFormularios";
import { LayoutPadraoUsuarioAdm } from "../Components/LayoutPadraoUsuarioAdm";
import { Servicos } from "../Pages/Servicos";
import { Barbeiros } from "../Pages/Barbeiros";

export default function appRouter() {
  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route path="/" element={<BarbaCabeloEBigode />} />
          {/* Formularios login e cadastro adm */}
          <Route element={<LayoutPadraoFormularios />}>
            <Route path="/cadastro" element={<FormCadastroAdm />} />
            <Route path="/confirmarCodigo/:endpoint" element={<ConfirmarCodigo />} />
            <Route path="/login" element={<Form />} />
            <Route path="/redefinirSenha" element={<TrocarSenha />} />
          </Route>
          {/* Paginas barbearia Adm */}
          <Route element={<LayoutPadraoUsuarioAdm/>}>
            <Route path="/:barbearia/agendamentos" element={<Agendamentos />} />
            <Route path="/:barbearia/servicos" element={<Servicos />} />
            <Route path="/:barbearia/barbeiros" element={<Barbeiros/>} /> 
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}
