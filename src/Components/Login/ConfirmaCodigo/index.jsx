import { useContext } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmarCodigoSchema } from "../../../validations/ConfirmarCodigo";
import { MutatingDots } from "react-loader-spinner";

export const ConfirmaCodigo = () => {
  const { setConfirmarCodigo, setLoadLogin, criarUsuario, loadLogin } =
    useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmarCodigoSchema),
  });

  return (
    <form
      action=""
      className="col-12 formulario-page-login"
      onSubmit={handleSubmit(criarUsuario)}
    >
      <div className="col-12 text-center">
        <h3 className="titulo-form-login my-4">Barba Cabelo & Bigode</h3>
        <h5 className="text-white">Confirmação de código</h5>
        <p className="m-0 p-form-login">
          Insira o código recebido no seu email
        </p>
        {/* EMAIL */}
        <div className="encapsula-span-input-login my-3">
          <div className="col-8 d-flex flex-column">
            {/* SPAN */}
            <div className="col-12 d-flex justify-content-start align-items-center"></div>
            {/* ICONE E INPUT */}
            <div className="col-12 d-flex justify-content-start align-items-center">
              <div className="input-icone">
                <input
                  type="text"
                  className="input-login col-10"
                  placeholder="Digite o código"
                  {...register("CODIGO")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="encapsula-span-input-login my-3">
          <div className="col-8 d-flex flex-column">
            <div className="col-12 d-flex justify-content-start align-items-center my-3 flex-column">
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
                  wrapperClass="justify-content-center my-2"
                />
              ) : (
                <>
                  <button className="col-12 btn-form-login" type="submit">
                    Enviar
                  </button>
                  <p
                    className="m-0 col-12 text-center text-white cursor my-2 pt-2"
                    onClick={() => {
                      setLoadLogin(false);
                      setConfirmarCodigo(false);
                    }}
                  >
                    Voltar
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
