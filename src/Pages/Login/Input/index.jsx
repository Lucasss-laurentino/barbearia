import { ErrosFormLogin } from '../ErrosFormLogin';

export const Input = ({ register, errors, span, nomeInput, type, placeholder, icon }) => {
  return (
    <div className="encapsula-inputs">
      <span className="span-login">{span}</span>
      <div className="input-icone">
        {icon}
        <input
          type={type}
          className="input-form-login"
          placeholder={placeholder}
          {...register(nomeInput)}
        />
      </div>
      {errors[nomeInput] && <ErrosFormLogin error={errors[nomeInput].message} />}
    </div>
  );
};