import "./index.css";

export const ComoComecar = () => {
  return (
    <div className="container py-4">
      <div className="section-title">
        <h3>Como começar</h3>
      </div>

      <div className="row">
        {/* Lista de passos */}
        <div className="col-md-6 my-4 d-flex align-items-center justify-content-center">
          <ul className="list-unstyled w-100">
            {[
              {
                numero: "1",
                titulo: "Faça o Cadastro",
                texto:
                  "Informe o nome da sua barbearia e tenha um link personalizado: barbacabeloebigode.com.br/sua-barbearia.",
              },
              {
                numero: "2",
                titulo: "Gerencie agendamentos em tempo real",
                texto:
                  "Receba pedidos de agendamento em tempo real. O administrador pode aceitar ou recusar. Cadastre quantos serviços e barbeiros quiser, com horários personalizados para cada um.",
              },
              {
                numero: "3",
                titulo: "Totalmente gratuito",
                texto:
                  "O melhor de tudo? Você aproveita todos os recursos do sistema sem pagar nada.",
              },
            ].map((item) => (
              <li className="d-flex align-items-start mb-4" key={item.numero}>
                <div className="circle-icon me-3">{item.numero}</div>
                <div>
                  <h5>{item.titulo}</h5>
                  <p className="text-gray">{item.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagem */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="images/xshowcase2.png.pagespeed.ic.ci7sJy20h1.webp"
            alt="intro"
            className="img-fluid d-none d-lg-block d-xl-block"
          />
        </div>
      </div>

      {/* Botão de ação */}
      <div className="container mt-4 text-center">
        <a href="#cadastro" className="btn btn-header">
          CLIQUE AQUI E CADASTRE-SE AGORA
        </a>
      </div>
    </div>
  );
};
