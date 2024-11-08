import { FeedBack } from "./FeedBack";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavbarLandingPage } from "./NavbarLandingPage";
import { Planos } from "./Planos";

export const LandingPage = () => {
  return (
    <>
      <NavbarLandingPage />
      <Header />
      <Planos />
      <FeedBack />
      <Footer />
    </>
  );
};
