import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { Horarios } from "../Components/Horarios";
import { Finalizados } from "../Components/Finalizados";
import { EditarUser } from "../Components/EditarUser";
import { MenuFooterProvider } from "../Context/MenuFooterContext";
import { SocketProvider } from "../Context/SocketContext";
import { FinanceiroProvider } from "../Context/FinanceiroContext";
import { Barbeiros } from "../Components/Barbeiros";

export default function appRouter() {
  return (
    <Router>
      <PlanoProvider>
        <MenuFooterProvider>
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
                                    <FinanceiroProvider>
                                      <SocketProvider>
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
                                            <Route path="/:barbearia/servicos" element={<ListService />} />
                                            <Route path="/:barbearia/agendamentos" element={<Horarios />} />
                                            <Route path="/:barbearia/financeiro" element={<Finalizados />} />
                                            <Route path="/:barbearia/barbeiros" element={<Barbeiros />} />
                                            <Route path="/:barbearia/editarconta" element={<EditarUser />} />
                                          </Route>

                                          <Route path="/:barbearia/login" element={<Login />} />
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
                                      </SocketProvider>
                                    </FinanceiroProvider>
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
        </MenuFooterProvider>
      </PlanoProvider>
    </Router>
  );
}
