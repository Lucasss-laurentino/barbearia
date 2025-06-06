import { useContext, useEffect } from "react";
import { Balao } from "../../../Components/Balao";
import "./index.css";
import { ServicoContext } from "../../../Context/ServicoContext";

export const SpanAddServico = ({setShow}) => {

  const { servicos } = useContext(ServicoContext);

  return (
    <>
      <span className="adc-servico-fixo" onClick={() => setShow(true)}>
        { servicos.length < 1 && <Balao texto={"Cadastre um serviço aqui!"} /> }
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="#fff"
          className="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </span>
    </>
  );
};
