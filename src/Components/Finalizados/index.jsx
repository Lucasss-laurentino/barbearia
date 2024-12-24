import "./index.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { CardFinanceiro } from "./CardFinanceiro";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { BarbeiroContext } from "../../Context/BarbeiroContext";
import { Calendario } from "../Calendar";

export const Finalizados = () => {
  const { data } = useContext(DataContext);
  const { horariosMarcado } = useContext(HorarioMarcadoContext);
  const { servicos } = useContext(ServicoContext);
  const { barbeiros } = useContext(BarbeiroContext);

  const [lucroDiario, setLucroDiario] = useState("0,00");
  const [lucroMensal, setLucroMensal] = useState("0,00");
  const [lucroSemanal, setLucroSemanal] = useState("0,00");
  const [lucroTotal, setLucroTotal] = useState("0,00");
  const [lucroPersonalizado, setLucroPersonalizado] = useState("0,00");

  const [optionValueServico, setOptionValueServico] = useState("");
  const [optionValueBarbeiro, setOptionValueBarbeiro] = useState("");
  const hoje = new Date();
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [dataInicioOuDataFinal, setDataInicioOuDataFinal] = useState(true);
  const [classeCalendario, setClasseCalendario] = useState(
    "encapsula-calendario-hidden"
  );
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  // pegando lucro diario
  useEffect(() => {
    const dataDeHoje = hoje.toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const horariosFinalizadoDiario = horariosMarcado.filter((hM) => {
      // verifica se deve filtrar por serviço
      if (optionValueServico !== "" && optionValueBarbeiro === "") {
        if (
          hM.RESERVADO === 0 &&
          hM.DATA === dataDeHoje &&
          hM.SERVICO_ID === parseInt(optionValueServico)
        ) {
          return hM;
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico === "") {
        // verifica se deve filtrar por barbeiro
        if (
          hM.RESERVADO === 0 &&
          hM.DATA === dataDeHoje &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          return hM;
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico !== "") {
        if (
          hM.RESERVADO === 0 &&
          hM.DATA === dataDeHoje &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro) &&
          hM.SERVICO_ID === parseInt(optionValueServico)
        ) {
          return hM;
        }
      } else {
        if (hM.RESERVADO === 0 && hM.DATA === dataDeHoje) {
          return hM;
        }
      }
    });
    const lucro = horariosFinalizadoDiario.map((horarioFinalizado) => {
      const servico = servicos.find(
        (s) => s.ID === horarioFinalizado.SERVICO_ID
      );
      if (servico) {
        return parseInt(servico.PRECO.split(" ")[1].replace(",", "."));
      }
    });
    const lucroTotal = lucro.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual;
    }, 0);
    const lucroFormatado = lucroTotal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setLucroDiario(lucroFormatado);
  }, [horariosMarcado, optionValueServico, optionValueBarbeiro]);

  // lucro mensal
  useEffect(() => {
    const ultimoDiaDoMesAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      0
    ).getDate();

    const precos = horariosMarcado.map((hM) => {
      const diaHM = parseInt(hM.DATA.split("/")[0]);
      const mesHM = parseInt(hM.DATA.split("/")[1]);
      if (optionValueServico !== "" && optionValueBarbeiro === "") {
        if (
          diaHM <= ultimoDiaDoMesAtual &&
          mesHM === hoje.getMonth() + 1 &&
          hM.SERVICO_ID === parseInt(optionValueServico)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico?.PRECO.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico === "") {
        if (
          diaHM <= ultimoDiaDoMesAtual &&
          mesHM === hoje.getMonth() + 1 &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico?.PRECO.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico !== "") {
        if (
          diaHM <= ultimoDiaDoMesAtual &&
          mesHM === hoje.getMonth() + 1 &&
          hM.SERVICO_ID === parseInt(optionValueServico) &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico?.PRECO.split(" ")[1].replace(",", "."));
        }
      } else {
        if (diaHM <= ultimoDiaDoMesAtual && mesHM === hoje.getMonth() + 1) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico?.PRECO.split(" ")[1].replace(",", "."));
        }
      }
    });
    const precosFiltrado = precos.filter((p) => p !== undefined);
    const total = precosFiltrado.reduce((contador, valor) => {
      return contador + valor;
    }, 0);
    setLucroMensal(total);
  }, [horariosMarcado, servicos, optionValueServico, optionValueBarbeiro]);

  // lucro semanal
  useEffect(() => {
    const primeiroDiaDaSemana = hoje.getDate() - hoje.getDay();
    const precos = horariosMarcado.map((hM) => {
      const diaHM = parseInt(hM.DATA.split("/")[0]);
      const mesHM = parseInt(hM.DATA.split("/")[1]);
      if (optionValueServico !== "" && optionValueBarbeiro === "") {
        if (
          diaHM >= primeiroDiaDaSemana &&
          mesHM === hoje.getMonth() + 1 &&
          hM.SERVICO_ID === parseInt(optionValueServico)
        ) {
          const preco = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          ).PRECO;
          return parseFloat(preco.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueServico === "" && optionValueBarbeiro !== "") {
        if (
          diaHM >= primeiroDiaDaSemana &&
          mesHM === hoje.getMonth() + 1 &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const preco = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          ).PRECO;
          return parseFloat(preco.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico !== "") {
        if (
          diaHM >= primeiroDiaDaSemana &&
          mesHM === hoje.getMonth() + 1 &&
          hM.SERVICO_ID === parseInt(optionValueServico) &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const preco = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          ).PRECO;
          return parseFloat(preco.split(" ")[1].replace(",", "."));
        }
      } else {
        if (diaHM >= primeiroDiaDaSemana && mesHM === hoje.getMonth() + 1) {
          const preco = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          ).PRECO;
          return parseFloat(preco.split(" ")[1].replace(",", "."));
        }
      }
    });
    const precosFiltrado = precos.filter((preco) => preco !== undefined);
    const total = precosFiltrado.reduce((contador, valor) => {
      return contador + valor;
    }, 0);
    setLucroSemanal(total);
  }, [horariosMarcado, servicos, optionValueServico, optionValueBarbeiro]);

  // total
  useEffect(() => {
    const precos = horariosMarcado.map((hM) => {
      if (optionValueServico !== "" && optionValueBarbeiro === "") {
        if (
          hM.RESERVADO === 0 &&
          hM.SERVICO_ID === parseInt(optionValueServico)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico.PRECO.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueServico === "" && optionValueBarbeiro !== "") {
        if (
          hM.RESERVADO === 0 &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico.PRECO.split(" ")[1].replace(",", "."));
        }
      } else if (optionValueBarbeiro !== "" && optionValueServico !== "") {
        if (
          hM.RESERVADO === 0 &&
          hM.SERVICO_ID === parseInt(optionValueServico) &&
          hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
        ) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico.PRECO.split(" ")[1].replace(",", "."));
        }
      } else {
        if (hM.RESERVADO === 0) {
          const servico = servicos.find(
            (servico) => servico.ID === hM.SERVICO_ID
          );
          return parseFloat(servico.PRECO.split(" ")[1].replace(",", "."));
        }
      }
    });

    const precosFiltrado = precos.filter((p) => p !== undefined);

    const total = precosFiltrado.reduce((contador, valor) => {
      return contador + valor;
    }, 0);
    setLucroTotal(total);
  }, [horariosMarcado, servicos, optionValueServico, optionValueBarbeiro]);

  // personalizado
  useEffect(() => {
    if (dataInicio !== null && dataFinal !== null) {
      // pegando timestamp de dataInicio
      const dataInicioExplode = dataInicio.split("/").map(Number);
      const dataInicioNumerico = new Date(
        dataInicioExplode[2],
        dataInicioExplode[1] - 1,
        dataInicioExplode[0]
      ).getTime();
      // pegando timestamp de dataFinal
      const dataFinalExplode = dataFinal.split("/").map(Number);
      const dataFinalNumerico = new Date(
        dataFinalExplode[2],
        dataFinalExplode[1] - 1,
        dataFinalExplode[0]
      ).getTime();
      const horariosFinalizadoPersonalizado = horariosMarcado.filter((hM) => {
        // pegando timestamp da data de hM.DATA
        const hMExplode = hM.DATA.split("/").map(Number);
        const hMData = new Date(
          hMExplode[2],
          hMExplode[1] - 1,
          hMExplode[0]
        ).getTime();
        if (optionValueServico !== "" && optionValueBarbeiro === "") {
          if (
            hMData >= dataInicioNumerico &&
            hMData <= dataFinalNumerico &&
            hM.SERVICO_ID === parseInt(optionValueServico)
          ) {
            return hM;
          }
        } else if (optionValueBarbeiro !== "" && optionValueServico === "") {
          if (
            hMData >= dataInicioNumerico &&
            hMData <= dataFinalNumerico &&
            hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
          ) {
            return hM;
          }
        } else if (optionValueBarbeiro !== "" && optionValueServico !== "") {
          if (
            hMData >= dataInicioNumerico &&
            hMData <= dataFinalNumerico &&
            hM.SERVICO_ID === parseInt(optionValueServico) &&
            hM.BARBEIRO_ID === parseInt(optionValueBarbeiro)
          ) {
            return hM;
          }
        } else {
          if (hMData >= dataInicioNumerico && hMData <= dataFinalNumerico) {
            return hM;
          }
        }
      });
      let precos = [];
      horariosFinalizadoPersonalizado.forEach((hFP) => {
        const preco = parseFloat(
          servicos
            .find((s) => s.ID === hFP.SERVICO_ID)
            .PRECO.split(" ")[1]
            .replace(",", ".")
        );
        precos.push(preco);
      });
      const total = precos.reduce((contador, valor) => {
        return contador + valor;
      }, 0);
      setLucroPersonalizado(total);
    }
  }, [dataInicio, dataFinal, optionValueServico, optionValueBarbeiro]);

  const handleChangeServico = (event) => {
    setOptionValueServico(event.target.value);
  };
  const handleChangeBarbeiro = (event) => {
    setOptionValueBarbeiro(event.target.value);
  };
  const handleDataInicio = (dataParametro) => {
    const data = new Date(dataParametro);
    const dataFormatada = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setDataInicio(dataFormatada);
    setClasseCalendario("encapsula-calendario-hidden");
  };

  const handleDataFinal = (dataParametro) => {
    const data = new Date(dataParametro);
    const dataFormatada = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setDataFinal(dataFormatada);
    setClasseCalendario("encapsula-calendario-hidden");
  };

  return (
    <>
      <Calendario
        classeCalendario={classeCalendario}
        setClassCalendario={setClasseCalendario}
        calendarioAberto={calendarioAberto}
        dataInicioOuDataFinal={dataInicioOuDataFinal}
        handleDataInicio={handleDataInicio}
        handleDataFinal={handleDataFinal}
        filtro={true}
      />
      <div className="fundo-imagem">
        <div className="cortina-transparente">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 filtro">
                <div className="col-6">
                  <div className="col-12 d-flex justify-content-start align-items-center">
                    <span className="text-white">Data Ínicio:</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-calendar3 mx-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onFocus={() => {
                      setClasseCalendario("encapsula-calendario");
                      setDataInicioOuDataFinal(true);
                      setCalendarioAberto(true);
                    }}
                    className="input-finalizados text-white"
                    value={dataInicio !== null ? dataInicio : data}
                    placeholder={data}
                  />
                </div>
                <div className="col-6 ">
                  <div className="col-12 d-flex justify-content-start align-items-center">
                    <span className="text-white">Data Final:</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-calendar3 mx-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onFocus={() => {
                      setClasseCalendario("encapsula-calendario");
                      setDataInicioOuDataFinal(false);
                      setCalendarioAberto(true);
                    }}
                    className="input-finalizados text-white"
                    value={dataFinal !== null ? dataFinal : data}
                    placeholder={data}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-10 filtro">
                <div className="col-6 d-flex flex-column justify-content-center mb-3 ">
                  <span className="text-white">Serviço</span>
                  <select
                    value={optionValueServico}
                    className="select-servico-barbeiro"
                    aria-label=".form-select-sm example"
                    onChange={handleChangeServico}
                  >
                    <option value={""}>Todos</option>
                    {servicos.map((servico) => {
                      return (
                        <Fragment key={servico.ID}>
                          <option value={servico.ID}>
                            {servico.NOME_SERVICO}
                          </option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>

                <div className="col-6 d-flex flex-column justify-content-center mb-3">
                  <span className="text-white">Barbeiro</span>
                  <select
                    value={optionValueBarbeiro}
                    onChange={handleChangeBarbeiro}
                    className="select-servico-barbeiro"
                    aria-label=".form-select-sm example"
                  >
                    <option value={""}>Todos</option>
                    {barbeiros.map((barbeiro) => {
                      return (
                        <Fragment key={barbeiro.ID}>
                          <option value={barbeiro.ID}>{barbeiro.NOME}</option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-10 filtro">
                <div className="col-6 margin-rigth-data-inicio">
                  <CardFinanceiro preco={lucroMensal} periodo={"Mensal"} />
                </div>
                <div className="col-6">
                  <CardFinanceiro preco={lucroSemanal} periodo={"Semanal"} />
                </div>
              </div>
              <div className="col-12 col-sm-10 filtro">
                <div className="col-6 margin-rigth-data-inicio">
                  <CardFinanceiro preco={lucroDiario} periodo={"Diário"} />
                </div>
                <div className="col-6">
                  <CardFinanceiro preco={lucroTotal} periodo={"Total"} />
                </div>
              </div>
              <div className="col-12 col-sm-10 filtro">
                <div className="col-12">
                  <CardFinanceiro
                    preco={lucroPersonalizado}
                    periodo={"Personalizado"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
