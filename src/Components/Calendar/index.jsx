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
      console.log("teste");
      document.addEventListener("click", (event) => {
        if (event.clientY < 100 || event.clientY > 384) {
          setClassCalendario("encapsula-calendario-hidden");
        }
        if (event.clientX < 40 || event.clientX > 410) {
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
      const hoje = new Date().setHours(0,0,0,0);
      const dataEscolhida = new Date(dataParametro).setHours(0,0,0,0);
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
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
