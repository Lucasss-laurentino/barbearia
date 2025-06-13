import { useContext } from "react";
import { BarbeiroContext } from "../../../Context/BarbeiroContext";

export const ExpandeHorarios = ({ expandedBarbeiroId, barbeiro, setShow }) => {
  const { setBarbeiroSelecionado } = useContext(BarbeiroContext);

  return (
    <>
      <div
        className={`horarios-barbeiro ${
          expandedBarbeiroId === barbeiro.id ? "expanded" : ""
        }`}
      >
        {barbeiro.horarios.$values.length < 1 && (
          <div className="block-all-card">
            <div className="sem-horarios">
              <p>Nenhum horário cadastrado</p>
              <button
                className="btn-adicionar-horario"
                onClick={() => {
                  setBarbeiroSelecionado(barbeiro);
                  setShow(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Adicionar Horário
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
