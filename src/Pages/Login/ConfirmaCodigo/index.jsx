import { useContext } from "react";
import { LoginContext } from "../../../Context/LoginContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmarCodigoSchema } from "../../../validations/ConfirmarCodigo";
import { MutatingDots } from "react-loader-spinner";
import { Voltar } from "../Voltar";
import { Input } from "../Input";

export const ConfirmaCodigo = ({ barbearia = null, plano_id = null, setFormAtivo }) => {
  const {
    setLoadLogin,
    criarUsuario,
    loadLogin,
    cadastroError,
    setCadastroError,
    validarCodigoMudarSenha,
    recuperaSenha,
    barbeariaClean,
  } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmarCodigoSchema),
  });

  const setarLocalStorageEenviarCodigo = (data) => {
    validarCodigoMudarSenha(data, barbearia);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <form
              action=""
              className="col-12 formulario-page-login"
              onSubmit={handleSubmit(!recuperaSenha ? (data) => criarUsuario(data, barbearia, plano_id) : (data) => setarLocalStorageEenviarCodigo(data))}
            >
              <Voltar barbearia={barbearia} />
              <p className="m-0 p-form-login">Insira o código recebido no seu email</p>
              <Input
                register={register}
                errors={errors}
                span={"Código"}
                nomeInput={"CODIGO"}
                type={"text"}
                placeholder={"Digite o codigo"}
                icon={
                  <></>
                }
              />
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
          </div>
        </div>
      </div>
    </>
  );
};
