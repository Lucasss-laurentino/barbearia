import { useContext, useEffect, useState } from "react";
import "./index.css";
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { DataContext } from "../../Context/DataContext";

export const Calendario = () => {
  const [dias, setDias] = useState();
  const [hoje, setHoje] = useState(new Date());
  const [diaAtual, setDiaAtual] = useState(hoje.getDate());
  const [mes, setMes] = useState(new Date().getMonth());
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [semanas, setSemanas] = useState([]);
  const [ultimosDiasMesPassado, setUltimosDiasMesPassado] = useState([]);
  const [primeirosDiasDoMesQueVem, setPrimeirosDiasDoMesQueVem] = useState();
  const [mesNome, setMesNome] = useState(
    new Date(hoje.getFullYear(), mes).toLocaleString("pt-BR", { month: "long" })
  );
  const { animaCalendario, setAnimaCalendario } = useContext(AnimacaoContext);
  const { mudarData } = useContext(DataContext);

  const mesAnterior = () => {
    setMes((prevMes) => (prevMes + 1) % 12);
    if (mes === 11) {
      setHoje((prevHoje) => new Date(prevHoje.getFullYear() + 1, 0));
    }
  };

  const proximoMes = () => {
    setMes((prevMes) => (prevMes - 1 + 12) % 12);
    if (mes === 0) {
      setHoje((prevHoje) => new Date(prevHoje.getFullYear() - 1, 11));
    }
  };

  // esse useEffect trata os dados cuidando do mes e dos dias atual
  useEffect(() => {
    // retorna um inteiro se dia 1 foi em uma terça o retorno sera 2 onde 0 = domingo, 1 = segunda e 2 = terça
    const primeiroDiaDoMes = new Date(hoje.getFullYear(), mes, 1).getDay();

    const ultimoDiaDoMes = new Date(hoje.getFullYear(), mes + 1, 0).getDate();

    const diasDoMes = Array.from({ length: ultimoDiaDoMes }, (_, i) => i + 1);

    const diasDoMesObj = diasDoMes.map((dia) => {
      return { dia, esseMes: true };
    });

    const ultimoDiaDoMesAnterior = new Date(
      hoje.getFullYear(),
      mes,
      0
    ).getDate();

    const diasDoMesAnterior = Array.from(
      { length: ultimoDiaDoMesAnterior },
      (_, i) => i + 1
    );

    const ultimosDiasDoMesAnterior =
      primeiroDiaDoMes !== 0 && diasDoMesAnterior.slice(-primeiroDiaDoMes);

    const ultimosDiasDoMesAnteriorObj =
      ultimosDiasDoMesAnterior.length > 0 &&
      ultimosDiasDoMesAnterior.map((dia) => {
        return { dia, esseMes: false };
      });

    if (!ultimosDiasDoMesAnterior) {
      setUltimosDiasMesPassado([]);
      setDias([...diasDoMesObj]);
    } else {
      setUltimosDiasMesPassado([...ultimosDiasDoMesAnteriorObj]);
      setDias([...ultimosDiasDoMesAnteriorObj, ...diasDoMesObj]);
    }
    setMesNome(
      new Date(hoje.getFullYear(), mes).toLocaleString("pt-BR", {
        month: "long",
      })
    );
  }, [mes]);

  // separa 7 dias em 1 semana pra poder renderizar na tabela
  useEffect(() => {
    let semanas = [];
    let limitador = 7;
    for (let contador = 0; contador < dias?.length; contador += limitador) {
      const semana = dias.slice(contador, contador + limitador);
      semanas.length < 6 && semanas.push(semana);
    }
    setSemanas(semanas);
  }, [mes, dias]);

  useEffect(() => {
    if (dias?.length < 35) {
      const quantosFalta = 35 - dias?.length;
      setPrimeirosDiasDoMesQueVem(quantosFalta);
      const ultimoDiaDoMesQueVem = new Date(
        hoje.getFullYear(),
        mes,
        0
      ).getDate();
      const diasMesQueVem = Array.from(
        { length: ultimoDiaDoMesQueVem },
        (_, i) => i + 1
      );

      const diasDoMesQueVemObgj = diasMesQueVem
        .slice(0, quantosFalta)
        .map((dia) => {
          return { dia, esseMes: false };
        });
      setDias([...dias, ...diasDoMesQueVemObgj]);
    }
  }, [semanas]);

  return (
    <>
      <div className={animaCalendario}>
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center">
            <div className="calendario-header d-flex justify-content-between alig-items-center">
              <div className="seletor-mes d-flex align-items-center col-6">
                <div className="col-3">
                  <button className="btn btn-sm btn-transparent col-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="#fff"
                      className="bi bi-caret-left-fill"
                      viewBox="0 0 16 16"
                      onClick={proximoMes}
                    >
                      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                  </button>
                </div>
                <div className="col-4 text-white">
                  <h6 className="m-0">{mesNome}</h6>
                </div>
                <div className="col-3">
                  <button className="btn btn-sm btn-transparent col-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="#fff"
                      className="bi bi-caret-right-fill"
                      viewBox="0 0 16 16"
                      onClick={mesAnterior}
                    >
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-around">
                <h6 className="m-0 text-white">{hoje.getFullYear()}</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#fff"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                  onClick={() =>
                    setAnimaCalendario(
                      "container-fluid calendario-hidden bg-dark"
                    )
                  }
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </div>
            </div>
            <table className="table table-dark table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">DOM.</th>
                  <th scope="col">SEG.</th>
                  <th scope="col">TER.</th>
                  <th scope="col">QUA.</th>
                  <th scope="col">QUI.</th>
                  <th scope="col">SEX.</th>
                  <th scope="col">SÁB.</th>
                </tr>
              </thead>
              <tbody>
                {semanas.map((semana, index) => {
                  return (
                    <tr key={index}>
                      {semana.map((dia) => {
                        if (!dia.esseMes) {
                          return <td className="text-secondary">{dia.dia}</td>;
                        } else if (dia.dia === diaAtual && mes === mesAtual) {
                          return <td className="text-success" onClick={() => mudarData(dia, mes, diaAtual)}>{dia.dia}</td>;
                        } else {
                          return <td onClick={() => mudarData(dia, mes, diaAtual)} className="text-white">{dia.dia}</td>;
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
