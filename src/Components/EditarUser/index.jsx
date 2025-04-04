import { useContext, useEffect, useState } from "react";
import "./index.css";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editarUsuarioSchema } from "../../validations/editarUsuario";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { MutatingDots } from "react-loader-spinner";

export const EditarUser = () => {
  const { editarUsuario, usuarioEditado, setUsuarioEditado, user, load, setLogo } =
    useContext(UserContext);

  const navigate = useNavigate();
  const { barbearia } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editarUsuarioSchema),
    defaultValues: {
      NOME: user?.NOME,
      NOME_BARBEARIA: user?.NOME_BARBEARIA,
    }
  });
  const [imagem, setImagem] = useState();

  useEffect(() => {
    if (usuarioEditado) {
      toast.success("Seus dados foram alterados com sucesso", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setLogo(user.IMG_LOGO)
      if(barbearia === user.NOME_BARBEARIA) {
        navigate(`/${barbearia}`);
        setUsuarioEditado(false);
      } else {
        window.location.href = `/${user.NOME_BARBEARIA}`;
      }
    }
  }, [usuarioEditado]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const tokenDecode = jwtDecode(token);
      } catch (error) {}
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
        transition={Bounce}
      />

      <div className="container-fluid p-0 fundo-imagem">
        <div className="cortina-transparente">
          <div className="row">
            <div className="col-12 encapsula-editar-usuario">
              <form
                encType="multipart/form-data"
                className="col-12 d-flex justify-content-center align-items-center flex-column"
                onSubmit={handleSubmit((data) => editarUsuario(data, imagem))}
              >
                <div className="col-12 col-lg-8 text-center">
                  <h4 className="text-white">Faça alteraçoes em sua conta</h4>
                  {/* NOME */}
                  <div className="col-12 d-flex justify-content-center align-itens-center flex-column mt-4">
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-2 icon-input-editar-perfil">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="#fff"
                          className="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                      </div>
                      <div className="col-6 div-input-editar-perfil">
                        <input
                          type="text"
                          className="input-editar-perfil col-12"
                          placeholder={user?.NOME}
                          {...register("NOME")}
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
                    {errors.NOME && (
                      <p className="m-0 my-1 text-white">
                        *{errors.NOME.message}
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
                  {/* NOME_BARBEARIA */}
                  {user?.ADM && (
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
                  )}
                  <div className="col-12 d-flex flex-column mt-4 justify-content-center alig-items-center">
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-10 d-flex justify-content-start">
                        <span className="text-white">
                          Defina uma imagem do Logo
                        </span>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-itens-center">
                      <div className="col-10 d-flex justify-content-start">
                        <input
                          type="file"
                          className="form-control-file text-white"
                          id="exampleFormControlFile1"
                          {...register("LOGO")}
                          onChange={(e) => setImagem(e.target?.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center alig-items-center">
                    <div className="col-12 d-flex justify-content-center alig-items-center">
                      {load ? (
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
                        <button type="submit" className="col-10 button-salvar">
                          Salvar
                        </button>
                      )}
                    </div>
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
