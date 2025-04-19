export const setarLocalStorageComHorarioMarcado = (horarioMarcado) => {
     localStorage.setItem(
       "agendamento",
       JSON.stringify(horarioMarcado)
     );
}