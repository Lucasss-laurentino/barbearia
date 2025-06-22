import "./index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  createUserSchemaADM,
} from "../../../validations/createUserValidation";
import { ErrosFormLogin } from "../ErrosFormLogin";
import InputMask from "react-input-mask";
import { useContext } from "react";
import { MutatingDots } from "react-loader-spinner";
import { CadastroEloginContext } from "../../../Context/CadastroEloginContext";
import { useNavigate, useParams } from "react-router-dom";
import { BtnVoltarForm } from "../BtnVoltarForm";

export const FormCadastro = () => {
  const navigate = useNavigate();
  const { barbearia: barbeariaParametro } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      barbeariaParametro ? createUserSchema : createUserSchemaADM
    ),
  });

  const { confirmarEmail, loadLogin, erroLoginInvalido } = useContext(
    CadastroEloginContext
  );

  const handleConfirmarEmail = async (dados) => {
    try {
      await confirmarEmail(dados);
      if (barbeariaParametro) {
        navigate(`/${barbeariaParametro}/confirmarCodigo/cadastro`);
        return;
      }
      navigate("/confirmarCodigo/cadastro");
    } catch (error) {}
  };

  return (
    <>
      <form
        action=""
        className="col-12 formulario-page-login"
        onSubmit={handleSubmit((dados) => handleConfirmarEmail(dados))}
      >
        <BtnVoltarForm />

        <div className="titulo-e-textos-form-login">
          <h3 className="titulo-form-login">Barba Cabelo & Bigode</h3>
          <h5 className="text-acesse-sua-conta">Crie uma conta</h5>
          <p className="m-0 p-form-login">
            Gerencie sua barbearia de forma fácil e rápida
          </p>
        </div>

        {/* EMAIL */}
        <div className="encapsula-inputs">
          <span className="span-login">Email</span>
          <div className="input-icone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="#fff"
              className="bi bi-envelope-at-fill col-2"
              viewBox="0 0 16 16"
            >
              <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
              <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
            </svg>
            <input
              type="text"
              className="input-form-login"
              placeholder="Digite seu Email"
              {...register("Email")}
            />
          </div>
          {errors["Email"] && (
            <ErrosFormLogin error={errors["Email"].message} />
          )}
        </div>

        {/* Nome */}
        <div className="encapsula-inputs pt-3">
          <span className="span-login">Seu Nome</span>
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
              placeholder="Digite seu Nome"
              {...register("Nome")}
            />
          </div>
          {errors["Nome"] && <ErrosFormLogin error={errors["Nome"].message} />}
        </div>

        {/* NomeBarbearia */}
        {!barbeariaParametro && (
          <div className="encapsula-inputs pt-3">
            <span className="span-login">Nome da Barbearia</span>
            <div className="input-icone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="#fff"
                className="bi bi-shop col-2"
                viewBox="0 0 16 16"
              >
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
              </svg>
              <input
                type="text"
                className="input-form-login"
                placeholder="Nome da sua Barbearia"
                {...register("NomeBarbearia")}
              />
            </div>
            {errors["NomeBarbearia"] && (
              <ErrosFormLogin error={errors["NomeBarbearia"].message} />
            )}
          </div>
        )}
        {/* Celular */}
        <div className="encapsula-inputs pt-3">
          <span className="span-login">Celular</span>
          <div className="input-icone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
              className="bi bi-phone"
              viewBox="0 0 16 16"
            >
              <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
            <InputMask
              mask="(99) 99999-9999"
              type="text"
              className="input-form-login"
              placeholder="Digite o seu nome"
              {...register("Celular")}
            />
          </div>
          {errors.Celular && <ErrosFormLogin error={errors.Celular.message} />}
        </div>

        {/* Senha */}
        <div className="encapsula-inputs pt-3">
          <span className="span-login">Escolha uma senha</span>
          <div className="input-icone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="#fff"
              className="bi bi-key-fill col-2"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
            <input
              type="password"
              className="input-form-login"
              placeholder="Digite sua senha"
              {...register("Senha")}
            />
          </div>
          {errors["Senha"] && (
            <ErrosFormLogin error={errors["Senha"].message} />
          )}
        </div>

        {/* Loading */}
        {loadLogin && (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#6d6d6d"
            secondaryColor="#6d6d6d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center my-2"
          />
        )}

        {erroLoginInvalido !== null && (
          <ErrosFormLogin error={erroLoginInvalido} />
        )}

        {/* Btn cadastrar */}
        {!loadLogin && (
          <button className="btn-form-login mt-3" type="submit">
            Cadastrar
          </button>
        )}
      </form>
    </>
  );
};
