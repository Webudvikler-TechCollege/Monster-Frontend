import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ loginData, setLoginData ] = useState('')

    useEffect(() => {
        if(sessionStorage.getItem('access_token')) {
            setLoginData(JSON.parse(sessionStorage.getItem('access_token')))            
        }
    },[children])

    return (
        <AuthContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)