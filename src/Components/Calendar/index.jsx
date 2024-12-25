import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import { DataContext } from "../../Context/DataContext";

export const Calendario = ({
  classeCalendario,
  setClassCalendario,
  calendarioAberto,
  dataInicioOuDataFinal = null,
  handleDataInicio = null,
  handleDataFinal = null,
  filtro = false,
  setClasseCalendario = "",
}) => {
  const [value, setValue] = useState(null);

  const { setData } = useContext(DataContext);

  // pega click fora do calendario pra fecha-lo
  useEffect(() => {
    if (calendarioAberto) {
      document.addEventListener("click", (event) => {
        if (event.clientY < 100 || event.clientY > 384) {
          setClassCalendario("encapsula-calendario-hidden");
        }
      });
    }
  }, [calendarioAberto]);

  const onChange = (dataParametro) => {
    setValue(dataParametro);
    if (filtro) {
      dataInicioOuDataFinal && handleDataInicio(dataParametro);
      !dataInicioOuDataFinal && handleDataFinal(dataParametro);
    } else {
      const hoje = new Date().setHours(0, 0, 0, 0);
      const dataEscolhida = new Date(dataParametro).setHours(0, 0, 0, 0);
      if (hoje <= dataEscolhida) {
        const data = new Date(dataParametro);
        const dataFormatada = data.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        setData(dataFormatada);
        setClasseCalendario("encapsula-calendario-hidden");
      }
    }
  };

  return (
    <div className={classeCalendario}>
      <div>
        <div className="col-12 close-calendario">
          <button onClick={() => {
           setClassCalendario("encapsula-calendario-hidden");
          }} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="red"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
};
