import { useContext, useState } from "react";
import "./index.css";
import Cards from "react-credit-cards-2";
import InputMask from "react-input-mask";
import { AssinaturaContext } from "../../Context/AssinaturaContext";
import { MutatingDots } from "react-loader-spinner";

export const MudarPagamento = () => {

  const { assinaturaLoader } = useContext(AssinaturaContext);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "EXPIRA") setState((prev) => ({ ...prev, ["expiry"]: value }));
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="fundo-imagem">
        <div className="cortina-transparente">
          
        </div >
      </div >
    </>
  );
};
