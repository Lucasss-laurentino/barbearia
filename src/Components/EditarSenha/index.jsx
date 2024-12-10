import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { novaSenhaSchema } from "../../validations/novaSenha";
import { useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";

export const EditarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(novaSenhaSchema),
  });

  const { cancelarMudarSenha, changeSenha } = useContext(LoginContext);

  return (
    <>
      <div className="container-fluid p-0 fundo-imagem">
        <div className="cortina-transparente">
          <div className="row">
            <div className="col-12 encapsula-editar-usuario">
              <form
                action=""
                className="col-12 d-flex justify-content-center align-items-center flex-column"
                onSubmit={handleSubmit(changeSenha)}
              >
                <div className="col-12 col-lg-8 text-center">
                  <h4 className="text-white">Faça alteraçoes em sua senha</h4>
                  {/* SENHA */}
                  <div className="col-12 d-flex justify-content-center align-itens-center flex-column mt-4">
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-2 icon-input-editar-perfil">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          className="bi bi-key"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                      </div>
                      <div className="col-6 div-input-editar-perfil">
                        <input
                          type="password"
                          className="input-editar-perfil col-12"
                          placeholder={"************"}
                          {...register("SENHA")}
                        />
                      </div>
                      <div className="col-2 div-btn-alterar">
                        <button className="btn btn-sm text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#fff"
                            className="bi bi-pen-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {errors.SENHA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.SENHA.message}
                      </p>
                    )}
                  </div>
                  {/* CONFIRMAR SENHA */}
                  <div className="col-12 d-flex justify-content-center align-itens-center flex-column mt-4">
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-2 icon-input-editar-perfil">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          className="bi bi-key"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                      </div>
                      <div className="col-6 div-input-editar-perfil">
                        <input
                          type="password"
                          className="input-editar-perfil col-12"
                          placeholder={"************"}
                          {...register("CONFIRMAR_SENHA")}
                        />
                      </div>
                      <div className="col-2 div-btn-alterar">
                        <button className="btn btn-sm text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#fff"
                            className="bi bi-pen-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {errors.CONFIRMAR_SENHA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.CONFIRMAR_SENHA.message}
                      </p>
                    )}
                  </div>
                  <div className="col-12 d-flex justify-content-center alig-items-center">
                    <div className="col-12 d-flex justify-content-center alig-items-center">
                      <button type="submit" className="col-10 button-salvar">
                        Salvar
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="col-10 button-salvar bg-danger m-2"
                      onClick={cancelarMudarSenha}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
