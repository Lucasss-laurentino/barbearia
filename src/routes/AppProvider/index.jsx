import { AgendamentoProvider } from "../../Context/AgendamentoContext";
import { BarbeariaProvider } from "../../Context/BarbeariaContext";
import { BarbeiroProvider } from "../../Context/BarbeiroContext";
import { CadastroEloginProvider } from "../../Context/CadastroEloginContext";
import { CalendarioProvider } from "../../Context/CalendarioContext";
import { HorarioProvider } from "../../Context/HorarioContext";
import { MenuFooterProvider } from "../../Context/MenuFooterContext";
import { ServicoProvider } from "../../Context/ServicoContext";
import { SignalRProvider } from "../../Context/SignalRContext";
import { UserProvider } from "../../Context/UserContext";

export function AppProviders({ children }) {
  return (
    <CalendarioProvider>
      <UserProvider>
        <BarbeariaProvider>
          <ServicoProvider>
            <BarbeiroProvider>
              <HorarioProvider>
                <MenuFooterProvider>
                  <AgendamentoProvider>
                    <SignalRProvider>
                      <CadastroEloginProvider>
                        {children}
                      </CadastroEloginProvider>
                    </SignalRProvider>
                  </AgendamentoProvider>
                </MenuFooterProvider>
              </HorarioProvider>
            </BarbeiroProvider>
          </ServicoProvider>
        </BarbeariaProvider>
      </UserProvider>
    </CalendarioProvider>
  );
}
