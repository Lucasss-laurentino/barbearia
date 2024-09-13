import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    
    const [classMenu, setClassMenu] = useState(false);

    return (
        <MenuContext.Provider value={{classMenu, setClassMenu}}>
            {children}
        </MenuContext.Provider>
    )
}