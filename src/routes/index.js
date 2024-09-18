import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageLogin } from "../Components/PageLogin";
import { Index } from "../Components/Index";
import { MenuProvider } from "../Context/MenuContext";
import { AbaBottomProvider } from "../Context/AbaBottomContext";
import { UserProvider } from "../Context/UserContext";
import { AnimacaoProvider } from "../Context/AnimacaoHorarios";
import { ServicoProvider } from "../Context/ServicoContext";
import { BarbeiroProvider } from "../Context/BarbeiroContext";
import { HorarioProvider } from "../Context/HorarioContext";
import { MeuHorarioProvider } from "../Context/MeuHorario";
import { LoginProvider } from "../Context/LoginContext";

export default function appRouter() {
  return (
    <UserProvider>
      <ServicoProvider>
        <BarbeiroProvider>
          <HorarioProvider>
            <MeuHorarioProvider>
              <AnimacaoProvider>
                <AbaBottomProvider>
                  <MenuProvider>
                    <Router>
                      <LoginProvider>
                        <Routes>
                          <Route path="/" element={<PageLogin />} />
                          <Route path="/index" element={<Index />} />
                        </Routes>
                      </LoginProvider>
                    </Router>
                  </MenuProvider>
                </AbaBottomProvider>
              </AnimacaoProvider>
            </MeuHorarioProvider>
          </HorarioProvider>
        </BarbeiroProvider>
      </ServicoProvider>
    </UserProvider>
  );
}
