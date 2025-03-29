import { createContext, useState } from "react";

export const AnimacaoContext = createContext();

export const AnimacaoProvider = ({ children }) => {

  const [animaCalendario, setAnimaCalendario] = useState("container-fluid calendario-hidden bg-dark");

  const abrirListaHorarios = (BARBEIRO_ID, horariosAberto, setHorariosAberto) => {

    const resetar_icones_ativo = document.getElementsByClassName("icone_aberto")
    const resetar_icones_seta = document.getElementsByClassName("icone_mais_aberto")
    //resetar_icones_ativo.setAttribute("class", "icone_fechado")
    resetar_icones_ativo?.[0]?.setAttribute("class", "icone_fechado d-flex justify-content-center")
    resetar_icones_seta?.[0]?.setAttribute("class", "icone_mais_fechado d-flex justify-content-center")

    if (BARBEIRO_ID === horariosAberto.BARBEIRO_ID) {
      if(!horariosAberto.ABERTO) {
        const elementAberto = document.getElementById(BARBEIRO_ID);
        elementAberto.setAttribute("class", "abrir-horarios");
        setHorariosAberto({ ABERTO: !horariosAberto.ABERTO, BARBEIRO_ID });
        const icon_time = document.getElementById(`icon-time-${BARBEIRO_ID}`);
        icon_time.setAttribute("class", "icone_aberto d-flex justify-content-center")
        const icon_mais = document.getElementById(`icon-mais-${BARBEIRO_ID}`);
        icon_mais.setAttribute("class", "icone_mais_aberto d-flex justify-content-center")
      } else {
        setHorariosAberto({ ABERTO: !horariosAberto.ABERTO, BARBEIRO_ID });
        const element = document.getElementById(BARBEIRO_ID);
        element.setAttribute("class", "fechar-horarios");
        const icon_time = document.getElementById(`icon-time-${BARBEIRO_ID}`);
        icon_time.setAttribute("class", "icone_fechado d-flex justify-content-center")
        const icon_mais = document.getElementById(`icon-mais-${BARBEIRO_ID}`);
        icon_mais.setAttribute("class", "icone_mais_fechado d-flex justify-content-center")
      }
    } 
    if(BARBEIRO_ID !== horariosAberto.BARBEIRO_ID) {
      const element = document.getElementById(horariosAberto.BARBEIRO_ID);
      element !== null && element.setAttribute("class", "fechar-horarios");
      setHorariosAberto({ABERTO: true, BARBEIRO_ID});
      const elementAberto = document.getElementById(BARBEIRO_ID);
      elementAberto.setAttribute("class", "abrir-horarios");
      const icon_time = document.getElementById(`icon-time-${BARBEIRO_ID}`);
      icon_time.setAttribute("class", "icone_aberto d-flex justify-content-center")
      const icon_mais = document.getElementById(`icon-mais-${BARBEIRO_ID}`);
      icon_mais.setAttribute("class", "icone_mais_aberto d-flex justify-content-center")
    }
  };

  return (
    <AnimacaoContext.Provider
      value={{
        abrirListaHorarios,
        animaCalendario,
        setAnimaCalendario
      }}
    >
      {children}
    </AnimacaoContext.Provider>
  );
};