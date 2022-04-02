import { createContext, useState } from "react"
export const KeyContext = createContext()

export const KeyProvider = function ({ children }) {
    const [equation, setEquation] = useState("")

    return (
        <KeyContext.Provider value={{ equation, setEquation }}>
            {children}
        </KeyContext.Provider>
    )
}
