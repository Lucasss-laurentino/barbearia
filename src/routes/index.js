import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageIndex } from "../Components/PageIndex";
import { PageLogin } from "../Components/PageLogin";
import { AnimationLoginProvider } from "../Context/AnimationLoginContext";

export default function appRouter() {
  return (
    <AnimationLoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/login" element={<PageLogin />} />
        </Routes>
      </Router>
    </AnimationLoginProvider>
  );
}
