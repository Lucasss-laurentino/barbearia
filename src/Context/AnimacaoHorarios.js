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

    // SE FOR CLICADO NO MESMO BARBEIRO FECHE HORARIOS OU ABRA OS MESMOS HORARIOS
    if (BARBEIRO_ID === horariosAberto.BARBEIRO_ID) {
      if(!horariosAberto.ABERTO) {
        // se já tiver aberta e o usuario clicar na aba, fecha-a
        const elementAberto = document.getElementById(BARBEIRO_ID);
        elementAberto.setAttribute("class", "abrir-horarios");
        //atualize o estado de horariosAerto
        setHorariosAberto({ ABERTO: !horariosAberto.ABERTO, BARBEIRO_ID });

        // animando icone relogio e seta
        const icon_time = document.getElementById(`icon-time-${BARBEIRO_ID}`);
        icon_time.setAttribute("class", "icone_aberto d-flex justify-content-center")

        const icon_mais = document.getElementById(`icon-mais-${BARBEIRO_ID}`);
        icon_mais.setAttribute("class", "icone_mais_aberto d-flex justify-content-center")


      } else {
        // se não, abra e atualize o estado de horariosAerto
        setHorariosAberto({ ABERTO: !horariosAberto.ABERTO, BARBEIRO_ID });
        const element = document.getElementById(BARBEIRO_ID);
        element.setAttribute("class", "fechar-horarios");

        // animando icone relogio e seta
        const icon_time = document.getElementById(`icon-time-${BARBEIRO_ID}`);
        icon_time.setAttribute("class", "icone_fechado d-flex justify-content-center")

        const icon_mais = document.getElementById(`icon-mais-${BARBEIRO_ID}`);
        icon_mais.setAttribute("class", "icone_mais_fechado d-flex justify-content-center")
        
      }
    } 
    // SE O CLICADO FOR OUTRO BARBEIRO FECHA OS HORARIOS DESSE BARBEIRO ABERTO ATUALMENTE DEPOIS ABRA OS HORARIOS DO BARBEIRO CLICADO
    if(BARBEIRO_ID !== horariosAberto.BARBEIRO_ID) {
      // pegando elemento que tem o id igual id do barbeiro
      const element = document.getElementById(horariosAberto.BARBEIRO_ID);
      // fechando elemento através da classe
      element !== null && element.setAttribute("class", "fechar-horarios");
      // atualize o estado de horariosAerto
      setHorariosAberto({ABERTO: true, BARBEIRO_ID});
      // abrindo horarios através da classe
      const elementAberto = document.getElementById(BARBEIRO_ID);
      elementAberto.setAttribute("class", "abrir-horarios");

      // animando icones relogio e seta
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