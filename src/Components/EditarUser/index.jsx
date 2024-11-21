import { useContext, useEffect, useState } from "react";
import "./index.css";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editarUsuarioSchema } from "../../validations/editarUsuario";

export const EditarUser = () => {
  const { pegarDadosPraEditar } = useContext(UserContext);
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editarUsuarioSchema),
  });

  useEffect(() => {
    let usuario;
    const pegarUsuario = async () => {
      usuario = await pegarDadosPraEditar();
      setUser(usuario.userObj);
    };
    pegarUsuario();
  }, []);

  const editarUsuario = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center flex-column">
            <div className="col-12 d-flex justify-content-start align-items-center mt-4">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                  className="bi bi-person-fill-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                </svg>
              </div>
              <div className="col-10 text-white d-flex justify-content-start align-items-center mx-3">
                <p className="m-0">Minha Conta</p>
              </div>
            </div>
            <div className="col-12 text-white d-flex justify-content-center align-items-center mt-4">
              <form
                action=""
                className="col-12 d-flex justify-content-center align-items-center flex-column"
                onSubmit={handleSubmit(editarUsuario)}
              >
                <div className="col-10 text-center">
                  <h6>Faça alteraçoes em sua conta</h6>
                  {/* EMAIL */}
                  <div className="col-12 d-flex justify-content-center align-itens-center mt-4 flex-column">
                    <div className="col-12 d-flex justify-content-center align-itens-center mt-4">
                      <div className="col-2 icon-input-editar-perfil">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          className="bi bi-envelope-at-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                          <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                        </svg>
                      </div>
                      <div className="col-6 div-input-editar-perfil">
                        <input
                          type="email"
                          className="input-editar-perfil col-12"
                          placeholder={user?.EMAIL}
                          {...register("EMAIL")}
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
                    {errors.EMAIL && (
                      <p className="m-0 my-1 text-white">
                        *{errors.EMAIL.message}
                      </p>
                    )}
                  </div>
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
                          placeholder={"**********"}
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
                  {/* BARBEARIA */}
                  <div className="col-12 d-flex justify-content-center align-itens-center flex-column mt-4">
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-2 icon-input-editar-perfil">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          className="bi bi-shop"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                        </svg>
                      </div>
                      <div className="col-6 div-input-editar-perfil">
                        <input
                          type="text"
                          className="input-editar-perfil col-12"
                          placeholder={user?.NOME_BARBEARIA}
                          {...register("NOME_BARBEARIA")}
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
                    {errors.NOME_BARBEARIA && (
                      <p className="m-0 my-1 text-white">
                        *{errors.NOME_BARBEARIA.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center alig-items-center">
                  <div className="col-10 d-flex justify-content-center alig-items-center">
                    <button type="submit" className="col-10 button-salvar">
                      Salvar
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
