import './index.css';

export const Configuracoes = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="lista-configuracoes text-white">
                <li>Minha Conta</li>
                <li>Serviços Finalizados</li>
                <li className='text-danger'>Sair</li>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}