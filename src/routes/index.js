import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageLogin } from "../Components/PageLogin";
import { AnimationLoginProvider } from "../Context/AnimationLoginContext";
import { Index } from "../Components/Index";
import { MenuProvider } from "../Context/MenuContext";

export default function appRouter() {
  return (
    <AnimationLoginProvider>
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PageLogin />} />
            <Route path="/index" element={<Index />} />
          </Routes>
        </Router>
      </MenuProvider>
    </AnimationLoginProvider>
  );
}
