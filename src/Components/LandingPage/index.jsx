import { useContext, useEffect } from "react";
import { FeedBack } from "./FeedBack";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavbarLandingPage } from "./NavbarLandingPage";
import { Planos } from "./Planos";
import { PlanoContext } from "../../Context/PlanoContext";

export const LandingPage = () => {

  const { getPlanos, planos } = useContext(PlanoContext);

  useEffect(() => {
    getPlanos();
  }, []);

  return (
    <>
      <NavbarLandingPage />
      <Header/>
      <Planos planos={planos} />
      <FeedBack />
      <Footer />
    </>
  );
};
