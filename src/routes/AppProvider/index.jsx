import { AgendamentoProvider } from "../../Context/AgendamentoContext";
import { BarbeariaProvider } from "../../Context/BarbeariaContext";
import { CadastroEloginProvider } from "../../Context/CadastroEloginContext";
import { ServicoProvider } from "../../Context/ServicoContext";
import { UserProvider } from "../../Context/UserContext";

export function AppProviders({ children }) {
  return (
    <UserProvider>
      <BarbeariaProvider>
        <AgendamentoProvider>
          <ServicoProvider>
            <CadastroEloginProvider>{children}</CadastroEloginProvider>
          </ServicoProvider>
        </AgendamentoProvider>
      </BarbeariaProvider>
    </UserProvider>
  );
}
