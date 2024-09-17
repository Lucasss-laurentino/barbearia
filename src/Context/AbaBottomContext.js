import { createContext, useState } from "react";

export const AbaBottomContext = createContext();

export const AbaBottomProvider = ({ children }) => {
  const [active, setActive] = useState(2);

  return (
    <AbaBottomContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </AbaBottomContext.Provider>
  );
};
