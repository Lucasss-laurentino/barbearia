import { AgendamentoProvider } from "../../Context/AgendamentoContext";
import { BarbeariaProvider } from "../../Context/BarbeariaContext";
import { BarbeiroProvider } from "../../Context/BarbeiroContext";
import { CadastroEloginProvider } from "../../Context/CadastroEloginContext";
import { HorarioProvider } from "../../Context/HorarioContext";
import { ServicoProvider } from "../../Context/ServicoContext";
import { UserProvider } from "../../Context/UserContext";

export function AppProviders({ children }) {
  return (
    <UserProvider>
      <BarbeariaProvider>
        <AgendamentoProvider>
          <ServicoProvider>
            <BarbeiroProvider>
              <HorarioProvider>
                <CadastroEloginProvider>{children}</CadastroEloginProvider>
              </HorarioProvider>
            </BarbeiroProvider>
          </ServicoProvider>
        </AgendamentoProvider>
      </BarbeariaProvider>
    </UserProvider>
  );
}
