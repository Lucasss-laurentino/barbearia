import { createContext, useState } from "react";

export const AnimationLoginContext = createContext();

export const AnimationLoginProvider = ({ children }) => {
  const [classBtn, setClassBtn] = useState(
    "btn-login d-flex justify-content-center align-items-center text-decoration-none"
  );

  const [divNone, setDivNone] = useState(
    "col-12 d-flex justify-content-center pb-5"
  );

  const [classFormLogin, setClassFormLogin] = useState(
    "hidden-form-login form-login-none"
  );

  const [btnRenderizado, setBtnRenderizado] = useState(true);

  return (
    <AnimationLoginContext.Provider
      value={{
        classBtn,
        setClassBtn,
        divNone,
        setDivNone,
        btnRenderizado,
        setBtnRenderizado,
        classFormLogin,
        setClassFormLogin,
      }}
    >
      {children}
    </AnimationLoginContext.Provider>
  );
};
