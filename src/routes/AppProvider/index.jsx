import { AbaBottomProvider } from "../../Context/AbaBottomContext";
import { AnimacaoProvider } from "../../Context/AnimacaoHorarios";
import { AssinaturaProvider } from "../../Context/AssinaturaContext";
import { BarbeariaProvider } from "../../Context/BarbeariaContext";
import { BarbeiroProvider } from "../../Context/BarbeiroContext";
import { DataProvider } from "../../Context/DataContext";
import { FinanceiroProvider } from "../../Context/FinanceiroContext";
import { HorarioProvider } from "../../Context/HorarioContext";
import { HorarioMarcadoProvider } from "../../Context/HorarioMarcadoContext";
import { LocalStorageAgendamentoProvider } from "../../Context/LocalStorageAgendamentoContext";
import { LoginProvider } from "../../Context/LoginContext";
import { MenuProvider } from "../../Context/MenuContext";
import { MenuFooterProvider } from "../../Context/MenuFooterContext";
import { MeuHorarioProvider } from "../../Context/MeuHorario";
import { PagamentoProvider } from "../../Context/PagamentoContext";
import { PlanoProvider } from "../../Context/PlanoContext";
import { ServicoProvider } from "../../Context/ServicoContext";
import { SocketProvider } from "../../Context/SocketContext";
import { UserProvider } from "../../Context/UserContext";

export function AppProviders({ children }) {
  return (
    <PlanoProvider>
      <MenuFooterProvider>
        <BarbeariaProvider>
          <UserProvider>
            <ServicoProvider>
              <BarbeiroProvider>
                <HorarioProvider>
                  <MeuHorarioProvider>
                    <HorarioMarcadoProvider>
                      <LocalStorageAgendamentoProvider>
                        <AnimacaoProvider>
                          <AbaBottomProvider>
                            <MenuProvider>
                              <LoginProvider>
                                <DataProvider>
                                  <PagamentoProvider>
                                    <AssinaturaProvider>
                                      <FinanceiroProvider>
                                        <SocketProvider>
                                          {children}
                                        </SocketProvider>
                                      </FinanceiroProvider>
                                    </AssinaturaProvider>
                                  </PagamentoProvider>
                                </DataProvider>
                              </LoginProvider>
                            </MenuProvider>
                          </AbaBottomProvider>
                        </AnimacaoProvider>
                      </LocalStorageAgendamentoProvider>
                    </HorarioMarcadoProvider>
                  </MeuHorarioProvider>
                </HorarioProvider>
              </BarbeiroProvider>
            </ServicoProvider>
          </UserProvider>
        </BarbeariaProvider>
      </MenuFooterProvider>
    </PlanoProvider>
  );
}
