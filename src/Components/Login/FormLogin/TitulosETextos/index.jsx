import './index.css';

export const TitulosETextos = ({barbearia, nome_limpo_barbearia, showAcesseSuaConta = null}) => {
    return (
        <>
            <div className="titulo-e-textos-form-login">
                <h3 className="titulo-form-login">
                    {barbearia ? nome_limpo_barbearia : "Barba Cabelo & Bigode"}
                </h3>
                { showAcesseSuaConta === null && <h5 className="text-acesse-sua-conta">Acesse sua conta</h5>}
                {!barbearia && <p className="m-0 p-form-login">
                    Gerencie sua barbearia de forma fácil e rápida
                </p>}
            </div>
        </>
    );
}