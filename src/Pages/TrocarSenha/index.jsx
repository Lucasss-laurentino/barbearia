import "./index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { novaSenhaSchema } from "../../validations/novaSenha";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { MutatingDots } from "react-loader-spinner";
import { CadastroEloginContext } from "../../Context/CadastroEloginContext";
import { ErrosFormLogin } from "../Login/ErrosFormLogin";
import { useNavigate } from "react-router-dom";

export const TrocarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(novaSenhaSchema),
  });

  const { loadLogin, trocarSenha } = useContext(CadastroEloginContext);
  const navigate = useNavigate();

  const handleRedefinirSenha = async (dados) => {
    try {
      await trocarSenha(dados);
      navigate("/login");
    } catch (error) {}
  };

  return (
    <>
      <div className="background-foto">
        <div className="background-transparente">
          <div className="container-fluid">
            <div className="row tela-toda">
              <div className="col-12">
                <form
                  onSubmit={handleSubmit((dados) =>
                    handleRedefinirSenha(dados)
                  )}
                  className="col-12 formulario-page-login"
                >
                  <div className="titulo-e-textos-form-login">
                    <h3 className="titulo-form-login">Barba Cabelo & Bigode</h3>
                    <p className="m-0 p-form-login">Crie uma nova senha</p>
                  </div>

                  {/* Senha */}
                  <div className="encapsula-inputs pt-3">
                    <span className="span-login">Nova Senha</span>
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
                        type="text"
                        className="input-form-login"
                        placeholder="Digite sua nova senha"
                        {...register("NovaSenha")}
                      />
                    </div>
                    {errors["NovaSenha"] && (
                      <ErrosFormLogin error={errors["NovaSenha"].message} />
                    )}
                  </div>

                  {/* Confirmar senha */}
                  <div className="encapsula-inputs pt-3">
                    <span className="span-login">Confirmar Nova Senha</span>
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
                        type="text"
                        className="input-form-login"
                        placeholder="Confirme sua senha"
                        {...register("ConfirmarNovaSenha")}
                      />
                    </div>
                    {errors["ConfirmarNovaSenha"] && (
                      <ErrosFormLogin
                        error={errors["ConfirmarNovaSenha"].message}
                      />
                    )}
                  </div>

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
                        Alterar Senha
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
