import { createContext, useEffect, useState } from "react";

export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  
  return (
    <SignalRContext.Provider value={{ connection, setConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};
