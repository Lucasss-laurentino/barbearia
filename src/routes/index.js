import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BarbaCabeloEBigode } from "../Pages/barbaCabeloEBigode";
import { AppProviders } from "./AppProvider";
import { FormCadastro } from "../Pages/FormulariosLogin/FormCadastro";
import { ConfirmarCodigo } from "../Pages/FormulariosLogin/ConfirmarCodigo";
import { Form } from "../Pages/FormulariosLogin/FormLogin";
import { TrocarSenha } from "../Pages/TrocarSenha";
import { Agendamentos } from "../Pages/Agendamentos";
import { LayoutPadraoFormularios } from "../Components/LayoutPadraoFormularios";
import { LayoutPadrao } from "../Components/LayoutPadrao";
import { Servicos } from "../Pages/Servicos";
import { Barbeiros } from "../Pages/Barbeiros";
import { RotaPrivadaAdm } from "./RotaPrivadaAdm";
import { MeusHorarios } from "../Pages/MeusHorarios";

export default function appRouter() {
  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route path="/" element={<BarbaCabeloEBigode />} />
          {/* Formularios login e cadastro adm */}
          <Route element={<LayoutPadraoFormularios />}>
            <Route path="/cadastro" element={<FormCadastro />} />
            <Route path="/:barbearia/cadastroCliente" element={<FormCadastro />} />
            <Route
              path="/confirmarCodigo/:endpoint"
              element={<ConfirmarCodigo />}
            />
             <Route
              path="/:barbearia/confirmarCodigo/:endpoint"
              element={<ConfirmarCodigo />}
            />
            <Route path="/login" element={<Form />} />
            <Route path="/redefinirSenha" element={<TrocarSenha />} />
            <Route path="/:barbearia/login" element={<Form/>}/>
          </Route>
          {/* Paginas barbearia Adm */}
          <Route element={<LayoutPadrao />}>
            <Route
              path="/:barbearia/agendamentos"
              element={
                <RotaPrivadaAdm>
                  <Agendamentos />
                </RotaPrivadaAdm>
              }
            />
            <Route path="/:barbearia/servicos" element={<Servicos />} />
            <Route path="/:barbearia/barbeiros" element={<Barbeiros />} />
            <Route path="/:barbearia/meusHorarios" element={<MeusHorarios/>}/>
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}
