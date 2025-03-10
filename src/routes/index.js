import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { HorarioMarcadoProvider } from "../Context/HorarioMarcadoContext";
import { NotFound } from "../Components/NotFound";
import { DataProvider } from "../Context/DataContext";
import { LandingPage } from "../Components/LandingPage";
import { Login } from "../Components/Login";
import { PlanoProvider } from "../Context/PlanoContext";
import { AvisoPagamentoAtrasado } from "../Components/AvisoPagamentoAtrasado";
import { PagamentoProvider } from "../Context/PagamentoContext";
import { AssinaturaProvider } from "../Context/AssinaturaContext";
import { AtivarAssinatura } from "../Components/AtivarAssinatura";
import { PageDefault } from "../Components/PageDefault";
import { ListService } from "../Components/ListServices";
import { ListBarbeiros } from "../Components/ListBarbeiros";

export default function appRouter() {
  return (
    <Router>
        <PlanoProvider>
          <UserProvider>
            <ServicoProvider>
              <BarbeiroProvider>
                <HorarioProvider>
                  <MeuHorarioProvider>
                    <HorarioMarcadoProvider>
                      <AnimacaoProvider>
                        <AbaBottomProvider>
                          <MenuProvider>
                            <LoginProvider>
                              <DataProvider>
                                <PagamentoProvider>
                                  <AssinaturaProvider>
                                    <Routes>
                                      <Route
                                        path="/"
                                        element={<LandingPage />}
                                      />
                                      <Route
                                        path="/login/:plano_id"
                                        element={<Login />}
                                      />

                                      <Route path="/:barbearia" element={<PageDefault />}>
                                        <Route path="/:barbearia/servicos" element={<ListService />}/>
                                        <Route path="/:barbearia/agendamento" element={<ListBarbeiros />}/>
                                      </Route>

                                      <Route
                                        path="/:barbearia/teste"
                                        element={<Index />}
                                      />
                                      <Route
                                        path="/:barbearia/assinaturabloqueada"
                                        element={<AvisoPagamentoAtrasado />}
                                      />
                                      <Route
                                        path="/:barbearia/assinaturadesativada"
                                        element={<AtivarAssinatura />}
                                      />
                                      <Route
                                        path="/notfound"
                                        element={<NotFound />}
                                      />
                                    </Routes>
                                  </AssinaturaProvider>
                                </PagamentoProvider>
                              </DataProvider>
                            </LoginProvider>
                          </MenuProvider>
                        </AbaBottomProvider>
                      </AnimacaoProvider>
                    </HorarioMarcadoProvider>
                  </MeuHorarioProvider>
                </HorarioProvider>
              </BarbeiroProvider>
            </ServicoProvider>
          </UserProvider>
        </PlanoProvider>
    </Router>
  );
}
