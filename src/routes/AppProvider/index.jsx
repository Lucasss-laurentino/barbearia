import { CadastroEloginProvider } from "../../Context/CadastroEloginContext";

export function AppProviders({ children }) {
  return <CadastroEloginProvider>{children}</CadastroEloginProvider>;
}
