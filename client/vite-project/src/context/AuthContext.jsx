import { createContext, useState, useCallback, useEffect } from 'react';
import { postRequest, baseUrl } from '../utils/servicesFetchAPI';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name:''
    });

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    useEffect(()=>{
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));
    },[])

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const loginUpdate = useCallback((info) => {
        setLoginInfo(info);   
    },[])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser({
            name:''
        });
    },[])

    const registUser = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await postRequest(`${baseUrl}/users/register`, registerInfo);
        if (response.error) {
            return setError(response);
        }

        setLoading(false);

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        const response = await postRequest(`${baseUrl}/users/login`, loginInfo);
        if (response.error) {
            return setError(response);
        }

        setLoading(true);
        setError(null);
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    },[loginInfo]);


    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registUser,
            error,
            isLoading,
            logoutUser,
            loginUpdate,
            handleLogin,
            loginInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}