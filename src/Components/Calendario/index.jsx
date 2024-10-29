import { useEffect, useState } from "react";
import "./index.css";

export const Calendario = () => {
  const [dias, setDias] = useState();
  const [hoje, setHoje] = useState(new Date());
  const [mes, setMes] = useState(new Date().getMonth());
  const [semanas, setSemanas] = useState([]);
  const [ultimosDiasMesPassado, setUltimosDiasMesPassado] = useState([]);
  const [primeirosDiasDoMesQueVem, setPrimeirosDiasDoMesQueVem] = useState();
  // esse useEffect trata os dados cuidando do mes e dos dias atual
  useEffect(() => {
    // retorna um inteiro se dia 1 foi em uma terça o retorno sera 2 onde 0 = domingo, 1 = segunda e 2 = terça
    const primeiroDiaDoMes = new Date(hoje.getFullYear(), mes, 1).getDay();

    const ultimoDiaDoMes = new Date(hoje.getFullYear(), mes + 1, 0).getDate();

    const diasDoMes = Array.from({ length: ultimoDiaDoMes }, (_, i) => i + 1);

    const ultimoDiaDoMesAnterior = new Date(
      hoje.getFullYear(),
      mes,
      0
    ).getDate();

    const diasDoMesAnterior = Array.from(
      { length: ultimoDiaDoMesAnterior },
      (_, i) => i + 1
    );

    const ultimosDiasDoMesAnterior = diasDoMesAnterior.slice(-primeiroDiaDoMes);
    setUltimosDiasMesPassado([...ultimosDiasDoMesAnterior]);
    setDias([...ultimosDiasDoMesAnterior, ...diasDoMes]);
  }, []);

  // separa 7 dias em 1 semana pra poder renderizar na tabela
  useEffect(() => {
    let semanas = [];
    let limitador = 7;
    for (let contador = 0; contador < dias?.length; contador += limitador) {
      const semana = dias.slice(contador, contador + limitador);
      semanas.length < 5 && semanas.push(semana);
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
      setDias([...dias, ...diasMesQueVem.slice(0, quantosFalta)]);
    }
  }, [semanas]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <table class="table table-dark table-bordered text-center">
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
                <tr>
                  {semanas[0]?.map((dia, index) => {
                    if (index < ultimosDiasMesPassado.length) {
                      return <td className="text-secondary">{dia}</td>;
                    } else if (index >= ultimosDiasMesPassado.length) {
                      return <td className="text-white">{dia}</td>;
                    } else if (dia === hoje.getDate()) {
                      return <td className="text-success">{dia}</td>;
                    }
                  })}
                </tr>
                <tr>
                  {semanas[1]?.map((dia) => {
                    return (
                      <td
                        className={
                          dia === hoje.getDate() ? "text-success" : "text-white"
                        }
                      >
                        {dia}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {semanas[2]?.map((dia) => {
                    return (
                      <td
                        className={
                          dia === hoje.getDate() ? "text-success" : "text-white"
                        }
                      >
                        {dia}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {semanas[3]?.map((dia) => {
                    return (
                      <td
                        className={
                          dia === hoje.getDate() ? "text-success" : "text-white"
                        }
                      >
                        {dia}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {semanas[4]?.map((dia, index) => {
                    // Verifica se o índice está dentro da quantidade de dias do próximo mês
                    if (index >= semanas[4].length - primeirosDiasDoMesQueVem) {
                      return <td className="text-secondary">{dia}</td>;
                    } else {
                      return (
                        <td
                          className={
                            dia === hoje.getDate()
                              ? "text-success"
                              : "text-white"
                          }
                        >
                          {dia}
                        </td>
                      );
                    }
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
