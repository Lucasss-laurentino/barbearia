import { useCallback, useContext } from "react";
import { BarbeiroContext } from "../Context/BarbeiroContext";
import { HorarioContext } from "../Context/HorarioContext";
import { ServicoContext } from "../Context/ServicoContext";

export const useFormatarHorarioMarcado = () => {
  const { pegarBarbeiro } = useContext(BarbeiroContext);
  const { pegarHorario } = useContext(HorarioContext);
  const { pegarServico } = useContext(ServicoContext);

  const formatarHorarioMarcado = useCallback(
    async (horarioMarcado) => {
      const barbeiro = await pegarBarbeiro(horarioMarcado.BARBEIRO_ID);
      const horario = await pegarHorario(horarioMarcado.HORARIO_ID);
      const servico = await pegarServico(horarioMarcado.SERVICO_ID);
      return {
        ID: horarioMarcado.ID,
        RESERVADO: horarioMarcado.RESERVADO,
        DATA: horarioMarcado.DATA,
        HORA: horario?.HORA,
        SERVICO_ID: servico.ID,
        SERVICO: servico.NOME_SERVICO,
        PRECO: servico.PRECO,
        BARBEIRO_NOME: barbeiro.NOME,
        BARBEIRO_ID: barbeiro.ID
      };
    },
    [pegarBarbeiro, pegarHorario, pegarServico]
  );

  return { formatarHorarioMarcado };
};
