import { useRef, useEffect, useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import { CalendarioContext } from "../../Context/CalendarioContext";

export const Calendario = () => {
  const {
    formatarData,
    handleSelecionarData,
    mostrarCalendario,
    setMostrarCalendario,
    dataSelecionada,
  } = useContext(CalendarioContext);

  const calendarioRef = useRef(null);

  useEffect(() => {
    const handleClickFora = (event) => {
      if (
        calendarioRef.current &&
        !calendarioRef.current.contains(event.target)
      ) {
        setMostrarCalendario(false);
      }
    };

    if (mostrarCalendario) {
      document.addEventListener("mousedown", handleClickFora);
    } else {
      document.removeEventListener("mousedown", handleClickFora);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [mostrarCalendario]);
  
  return (
    <div className="wrapper-calendario">
      <button className="botao-data" onClick={() => setMostrarCalendario(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1.5A1.5 1.5 0 0 1 16 2.5v11A1.5 1.5 0 0 1 14.5 15h-13A1.5 1.5 0 0 1 0 13.5v-11A1.5 1.5 0 0 1 1.5 1H3V.5a.5.5 0 0 1 .5-.5zM1 4v9.5a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 .5-.5V4H1z" />
        </svg>
        {formatarData(dataSelecionada)}
      </button>

      <div
        className={`calendario-overlay ${
          mostrarCalendario ? "ativo" : "inativo"
        }`}
      >
        <div ref={calendarioRef} className="calendario-central">
          <Calendar
            onChange={handleSelecionarData}
            value={dataSelecionada}
            className="meu-calendario"
          />
        </div>
      </div>
    </div>
  );
};
