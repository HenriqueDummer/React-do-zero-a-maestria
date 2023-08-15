import { useContext, createContext } from "react";
import { TitleColorContext } from "../context/TitleColorContext";

const useTitleColorContext = () => {
    const context = useContext(TitleColorContext)

    if(!context){
        console.log("Erro")
    }

    return context
}

export default useTitleColorContext