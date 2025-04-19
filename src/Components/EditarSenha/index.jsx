import './index.css';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { novaSenhaSchema } from "../../validations/novaSenha";
import { useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MutatingDots } from 'react-loader-spinner';
import { Input } from '../../Pages/Login/Input';

export const EditarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(novaSenhaSchema),
  });

  const { cancelarMudarSenha, mudarSenha, loadEditarSenha } = useContext(LoginContext);

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
      <div className="background-foto">
        <div className="background-transparente-alterar-senha">
          <div className="container-alterar-senha">
            <h2>Alterar Senha</h2>
            <form onSubmit={handleSubmit(mudarSenha)}>
              <Input
                register={register}
                errors={errors}
                span={"Nova Senha"}
                nomeInput={"SENHA"}
                type={"password"}
                placeholder={"Digite uma senha"}
                icon={
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
                }
              />
              <Input
                register={register}
                errors={errors}
                span={"Confirmar Senha"}
                nomeInput={"CONFIRMAR_SENHA"}
                type={"password"}
                placeholder={"Digite sua senha"}
                icon={
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
                }
              />
              {loadEditarSenha ?
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
                :
                <>
                  <button className="btn-form-login" type="submit">
                    Alterar Senha
                  </button>
                  <button type="submit" className="btn-form-login bg-danger" onClick={cancelarMudarSenha}>Cancelar</button>
                </>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
