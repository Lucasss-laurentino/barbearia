import "./index.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { Calendario } from "../Calendario";
import { AnimacaoContext } from "../../Context/AnimacaoHorarios";
import { DataContext } from "../../Context/DataContext";
import { CardFinanceiro } from "./CardFinanceiro";
import { HorarioMarcadoContext } from "../../Context/HorarioMarcadoContext";
import { ServicoContext } from "../../Context/ServicoContext";
import { BarbeiroContext } from "../../Context/BarbeiroContext";

export const Finalizados = () => {
  const { setAnimaCalendario } = useContext(AnimacaoContext);
  const { data } = useContext(DataContext);
  const { horariosMarcado } = useContext(HorarioMarcadoContext);
  const { servicos } = useContext(ServicoContext);
  const { barbeiros } = useContext(BarbeiroContext);

  const [lucroDiario, setLucroDiario] = useState("0,00");
  const [lucroMensal, setLucroMensal] = useState("0,00");
  const [lucroSemanal, setLucroSemanal] = useState("0,00");
  const [lucroTotal, setLucroTotal] = useState("0,00");

  const [optionValueServico, setOptionValueServico] = useState("Todos");
  const [optionValueBarbeiro, setOptionValueBarbeiro] = useState("Todos");
  const hoje = new Date();
  
  // pegando lucro diario
  useEffect(() => {
    const dataDeHoje = `${hoje.toLocaleString("pt-BR", {
      day: "2-digit",
    })}/${hoje.toLocaleString("pt-BR", { month: "2-digit" })}`;
    const horariosFinalizadoDiario = horariosMarcado.filter((hM) => {
      if (hM.RESERVADO === 0 && hM.DATA === dataDeHoje) {
        return hM;
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
  }, [horariosMarcado]);

  // lucro mensal
  useEffect(() => {
    const hoje = new Date();

    // Obter o primeiro dia do mês
    const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1); // Data do primeiro dia do mês

    // Obter o dia atual
    const diaAtual = hoje.getDate(); // Dia de hoje

    // Formatar o primeiro dia do mês e o dia atual para comparação (em formato "dd/mm")
    const primeiroDiaFormatado = `${primeiroDiaDoMes
      .getDate()
      .toString()
      .padStart(2, "0")}/${(primeiroDiaDoMes.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const diaAtualFormatado = `${hoje.getDate().toString().padStart(2, "0")}/${(
      hoje.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    // Filtrar os horários marcados que foram finalizados e pertencem ao mês atual (entre o primeiro dia e o dia atual)
    const horariosFinalizadoMensal = horariosMarcado.filter((hM) => {
      const [dia, mes] = hM.DATA.split("/"); // Supondo que a data esteja no formato "dd/mm"
      const dataHorario = `${dia}/${mes}`;
      return (
        hM.RESERVADO === 0 &&
        dataHorario >= primeiroDiaFormatado &&
        dataHorario <= diaAtualFormatado
      );
    });

    // Mapeia os horários finalizados para obter os preços dos serviços correspondentes
    const lucroMensal = horariosFinalizadoMensal.map((horarioFinalizado) => {
      const servico = servicos.find(
        (s) => s.ID === horarioFinalizado.SERVICO_ID
      );
      if (servico) {
        return parseFloat(servico.PRECO.split(" ")[1].replace(",", ".")); // Convertendo o preço para número
      }
      return 0;
    });

    // Calcula o total de lucro mensal
    const lucroTotalMensal = lucroMensal.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual;
    }, 0);

    // Formata o lucro total para o formato monetário brasileiro
    const lucroMensalFormatado = lucroTotalMensal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Atualiza o estado com o lucro mensal formatado
    setLucroMensal(lucroMensalFormatado);
  }, [horariosMarcado, servicos]);

  // lucro semanal
  useEffect(() => {
    const hoje = new Date();

    // Calcular o primeiro dia (domingo) e o último dia (sábado) da semana atual
    const diaDaSemana = hoje.getDay(); // 0 = domingo, 6 = sábado
    const primeiroDiaDaSemana = new Date(hoje);
    primeiroDiaDaSemana.setDate(hoje.getDate() - diaDaSemana); // Subtrai os dias para pegar o domingo

    const ultimoDiaDaSemana = new Date(primeiroDiaDaSemana);
    ultimoDiaDaSemana.setDate(primeiroDiaDaSemana.getDate() + 6); // Sábado da mesma semana

    // Formatar as datas para comparação (em formato "dd/mm")
    const primeiroDiaFormatado = `${primeiroDiaDaSemana
      .getDate()
      .toString()
      .padStart(2, "0")}/${(primeiroDiaDaSemana.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const ultimoDiaFormatado = `${ultimoDiaDaSemana
      .getDate()
      .toString()
      .padStart(2, "0")}/${(ultimoDiaDaSemana.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    // Filtra os horários marcados que foram finalizados e pertencem à semana atual
    const horariosFinalizadoSemanal = horariosMarcado.filter((hM) => {
      const [dia, mes] = hM.DATA.split("/"); // Supondo que a data esteja no formato "dd/mm"
      const dataHorario = `${dia}/${mes}`;
      return (
        hM.RESERVADO === 0 &&
        dataHorario >= primeiroDiaFormatado &&
        dataHorario <= ultimoDiaFormatado
      );
    });

    // Mapeia os horários finalizados para obter os preços dos serviços correspondentes
    const lucroSemanal = horariosFinalizadoSemanal.map((horarioFinalizado) => {
      const servico = servicos.find(
        (s) => s.ID === horarioFinalizado.SERVICO_ID
      );
      if (servico) {
        return parseFloat(servico.PRECO.split(" ")[1].replace(",", ".")); // Convertendo o preço para número
      }
      return 0;
    });

    // Calcula o total de lucro semanal
    const lucroTotalSemanal = lucroSemanal.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual;
    }, 0);

    // Formata o lucro total para o formato monetário brasileiro
    const lucroSemanalFormatado = lucroTotalSemanal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Atualiza o estado com o lucro semanal formatado
    setLucroSemanal(lucroSemanalFormatado);
  }, [horariosMarcado, servicos]);

  // total
  useEffect(() => {
    // Verifica se existem horários marcados
    if (horariosMarcado.length === 0) {
      setLucroTotal("0,00"); // Se não houver dados, lucro é 0
      return;
    }

    // Encontrar a data mais baixa (primeiro horário) e a data mais alta (último horário)
    const todasDatas = horariosMarcado.map((hM) => hM.DATA); // Extrai as datas dos horários
    const dataMaisBaixa = new Date(
      Math.min(
        ...todasDatas.map((data) => {
          const [dia, mes] = data.split("/");
          return new Date(hoje.getFullYear(), mes - 1, dia).getTime(); // Convertendo a data para timestamp
        })
      )
    );

    const dataMaisAlta = new Date(
      Math.max(
        ...todasDatas.map((data) => {
          const [dia, mes] = data.split("/");
          return new Date(hoje.getFullYear(), mes - 1, dia).getTime(); // Convertendo a data para timestamp
        })
      )
    );

    // Formatando as datas para "dd/mm" para uso no filtro
    const dataMaisBaixaFormatada = `${dataMaisBaixa
      .getDate()
      .toString()
      .padStart(2, "0")}/${(dataMaisBaixa.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const dataMaisAltaFormatada = `${dataMaisAlta
      .getDate()
      .toString()
      .padStart(2, "0")}/${(dataMaisAlta.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    // Filtra os horários marcados que estão dentro do intervalo de datas
    const horariosNoIntervalo = horariosMarcado.filter((hM) => {
      const [dia, mes] = hM.DATA.split("/"); // Supondo que a data esteja no formato "dd/mm"
      const dataHorario = `${dia}/${mes}`;
      return (
        hM.RESERVADO === 0 &&
        dataHorario >= dataMaisBaixaFormatada &&
        dataHorario <= dataMaisAltaFormatada
      );
    });

    // Mapeia os horários finalizados para obter os preços dos serviços correspondentes
    const lucroTotal = horariosNoIntervalo.map((horarioFinalizado) => {
      const servico = servicos.find(
        (s) => s.ID === horarioFinalizado.SERVICO_ID
      );
      if (servico) {
        return parseFloat(servico.PRECO.split(" ")[1].replace(",", ".")); // Convertendo o preço para número
      }
      return 0;
    });

    // Calcula o total de lucro
    const lucroFinal = lucroTotal.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual;
    }, 0);

    // Formata o lucro total para o formato monetário brasileiro
    const lucroFormatado = lucroFinal.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Atualiza o estado com o lucro total formatado
    setLucroTotal(lucroFormatado);
  }, [horariosMarcado, servicos]);

  const handleChangeServico = (event) => {
    setOptionValueServico(event.target.value);
  };
  const handleChangeBarbeiro = (event) => {
    setOptionValueBarbeiro(event.target.value);
  };

  return (
    <>
      <Calendario />
      <div className="container-fluid mt-1 height-scroll">
        {/* FILTROS */}
        <div className="row justify-content-center">
          <div className="col-11 filtro flex-column pt-2">
            {/* DATA */}
            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
              {/* DATA INICIO */}
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
                  onFocus={() =>
                    setAnimaCalendario("container-fluid calendario bg-dark")
                  }
                  className="input-finalizados"
                  placeholder={data}
                />
              </div>
              {/* DATA FINAL */}
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
                  onFocus={() =>
                    setAnimaCalendario("container-fluid calendario bg-dark")
                  }
                  className="input-finalizados"
                  placeholder={data}
                />
              </div>
            </div>
            {/* SELECTS */}
            <div className="col-12 d-flex justify-content-between align-items-center">
              {/* SERVIÇOS */}
              <div className="col-6 d-flex flex-column justify-content-center mb-3">
                <span className="text-white">Serviço</span>
                <select
                  value={optionValueServico}
                  className="select-servico-barbeiro"
                  aria-label=".form-select-sm example"
                  onChange={handleChangeServico}
                >
                  <option>Todos</option>
                  {servicos.map((servico) => {
                    return (
                      <Fragment key={servico.ID}>
                        <option>{servico.NOME_SERVICO}</option>
                      </Fragment>
                    );
                  })}
                </select>
              </div>
              {/* BARBEIROS */}
              <div className="col-6 d-flex flex-column justify-content-center mb-3">
                <span className="text-white">Barbeiro</span>
                <select
                  value={optionValueBarbeiro}
                  onChange={handleChangeBarbeiro}
                  className="select-servico-barbeiro"
                  aria-label=".form-select-sm example"
                >
                  <option>Todos</option>
                  {barbeiros.map((barbeiro) => {
                    return (
                      <Fragment key={barbeiro.ID}>
                        <option>{barbeiro.NOME}</option>
                      </Fragment>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* CARD MENSAL E SEMANAL */}
        <div className="row justify-content-center">
          <div className="col-11 mt-3 d-flex justify-content-between p-0">
            <div className="col-6">
              <CardFinanceiro preco={lucroMensal} periodo={"Mensal"} />
            </div>
            <div className="col-6">
              <CardFinanceiro preco={lucroSemanal} periodo={"Semanal"} />
            </div>
          </div>
        </div>
        {/* CARDS DIARIO E PERSONALIZADO */}
        <div className="row justify-content-center">
          <div className="col-11 mt-1 d-flex justify-content-between p-0">
            <div className="col-6">
              <CardFinanceiro preco={lucroDiario} periodo={"Diário"} />
            </div>
            <div className="col-6">
              <CardFinanceiro preco={"0,00"} periodo={"Personalizado"} />
            </div>
          </div>
        </div>
        {/* CARD TOTAL */}
        <div className="row justify-content-center">
          <div className="col-11 mt-1 d-flex justify-content-between p-0">
            <div className="col-12">
              <CardFinanceiro preco={lucroTotal} periodo={"Total"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
