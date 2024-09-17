import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageLogin } from "../Components/PageLogin";
import { Index } from "../Components/Index";
import { MenuProvider } from "../Context/MenuContext";
import { AbaBottomProvider } from "../Context/AbaBottomContext";
import { UserProvider } from "../Context/UserContext";
import { AnimacaoProvider } from "../Context/AnimacaoHorarios";

export default function appRouter() {
  return (
    <UserProvider>
      <AnimacaoProvider>
        <AbaBottomProvider>
          <MenuProvider>
            <Router>
              <Routes>
                <Route path="/" element={<PageLogin />} />
                <Route path="/index" element={<Index />} />
              </Routes>
            </Router>
          </MenuProvider>
        </AbaBottomProvider>
      </AnimacaoProvider>
    </UserProvider>
  );
}
