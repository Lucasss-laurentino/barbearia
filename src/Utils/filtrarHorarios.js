export const retornaBarbeirosComHorariosFiltrado = async (
  barbeiros,
  horarios
) => {
  var barbeirosComHorarios = [];
  barbeiros.forEach((barbeiro) => {
    const horariosDesseBarbeiro = filtrarHorarios(barbeiro, horarios);
    const obj = { barbeiro, horarios: horariosDesseBarbeiro };
    barbeirosComHorarios.push(obj);
  });
  return barbeirosComHorarios;
};

const filtrarHorarios = (barbeiro, horarios) => {
  return horarios.filter((h) => h.BARBEIRO_ID === barbeiro.ID);
};

export const retornaHorariosDisponiveisPraAgendamento = async (
  barbeiroEhorariosFiltrado,
  horariosMarcado
) => {

  const idsMarcados = horariosMarcado.map((h) => h.HORARIO_ID);
  const resultado = barbeiroEhorariosFiltrado.map((item) => {
    const horariosDisponiveis = item.horarios.filter(
      (horario) => !idsMarcados.includes(horario.ID)
    );
    return {
      barbeiro: item.barbeiro,
      horarios: horariosDisponiveis,
    };
  });
  return resultado;
};

export const filtraHorariosPorHoraEminuto = async (horariosComBarbeiros) => {
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();

  const filtrados = horariosComBarbeiros.map(({ barbeiro, horarios }) => {
    const horariosFiltrados = horarios.filter(({ HORA }) => {
      const [hora, minuto] = HORA.split(":").map(Number);
      return hora > horaAtual || (hora === horaAtual && minuto > minutoAtual);
    });

    return {
      barbeiro,
      horarios: horariosFiltrados,
    };
  });

  return filtrados;
};
