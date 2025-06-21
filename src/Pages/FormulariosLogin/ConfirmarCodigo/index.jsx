import { MutatingDots } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmarCodigoSchema } from "../../../validations/ConfirmarCodigo";
import { ErrosFormLogin } from "../ErrosFormLogin";
import { useContext, useEffect } from "react";
import { CadastroEloginContext } from "../../../Context/CadastroEloginContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BtnVoltarForm } from "../BtnVoltarForm";

export const ConfirmarCodigo = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmarCodigoSchema),
  });

  const navigate = useNavigate();
  const { endpoint } = useParams();
  const { barbearia } = useParams();

  const {
    loadLogin,
    confirmarCodigoEcriaUsuario,
    confirmarCodigoTrocarSenha,
    erroLoginInvalido,
  } = useContext(CadastroEloginContext);

  useEffect(() => {
    console.log(barbearia)
  }, [barbearia]);

  const confirmarCodigo = async (dados) => {
    try {
      if (endpoint === "cadastro") {
        const barbeariaRetorno = await confirmarCodigoEcriaUsuario(dados);
        if(barbeariaRetorno !== null) {
          navigate(`/${barbeariaRetorno.nome}/agendamentos`);
          return;
        }
        navigate(`/${barbearia}/servicos`);
      }
      if (endpoint === "mudarSenha") {
        await confirmarCodigoTrocarSenha(dados);
        navigate("/redefinirSenha");
      }
    } catch (error) {}
  };

  return (
    <>
      <form
        action=""
        className="col-12 formulario-page-login"
        onSubmit={handleSubmit((dados) => confirmarCodigo(dados))}
      >

        <BtnVoltarForm/>

        <div className="titulo-e-textos-form-login">
          <h3 className="titulo-form-login">Barba Cabelo & Bigode</h3>
          <p className="m-0 p-form-login">
            Insira o código recebido no seu email
          </p>
        </div>

        {/* Codigo */}
        <div className="encapsula-inputs pt-3">
          <span className="span-login">Código</span>
          <div className="input-icone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="#fff"
              className="bi bi-person-vcard col-2"
              viewBox="0 0 16 16"
            >
              <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
            </svg>
            <input
              type="text"
              className="input-form-login"
              placeholder="Digite o código"
              {...register("Codigo")}
            />
          </div>
          {errors["Codigo"] && (
            <ErrosFormLogin error={errors["Codigo"].message} />
          )}
        </div>

        {erroLoginInvalido !== null && (
          <ErrosFormLogin error={erroLoginInvalido} />
        )}

        {loadLogin ? (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#6d6d6d"
            secondaryColor="#6d6d6d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
          />
        ) : (
          <>
            <button className="btn-form-login" type="submit">
              Confirmar
            </button>
          </>
        )}
      </form>
    </>
  );
};
