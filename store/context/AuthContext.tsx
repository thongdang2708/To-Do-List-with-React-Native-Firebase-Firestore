
import { createContext } from "react";
import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleUpdateToken } from "../../http/http";
import { useEffect } from 'react';

interface PropsChildren {
    children: React.ReactNode
}

interface tokenObject {
    idToken: String,
    refreshToken: String,
    dateGetToken: Date
}


interface ValuesOfContext {
    token: String | undefined,
    isAuthenticated: boolean | undefined,
    refreshToken: String | undefined,
    dateGetToken: Date | undefined,
    updateToken: (refreshToken : string) => void,
    getAuthToken: (token : tokenObject) => void,
    logout: () => void
} 


const defaultValues : ValuesOfContext = {
    token: "",
    isAuthenticated: undefined,
    dateGetToken: new Date(),
    refreshToken: "",
    updateToken: (refreshToken : string) => {},
    getAuthToken: (token: tokenObject) => {},
    logout: () => {}
};

const AuthContext = createContext<ValuesOfContext>(defaultValues);
const WEB_API_KEY ="AIzaSyDU0oTVYuEGXVtLLEtsX2DDxPALs5ywlUM";

export const AuthProvider = ({children}: PropsChildren) => {

    let [loading, setLoading] = useState(true);
    let [authToken, setAuthToken] = useState<tokenObject | undefined | null>(undefined);
   


    let getAuthToken = (token : tokenObject) => {
        token.dateGetToken = new Date();
        setAuthToken(token);
        AsyncStorage.setItem("authTokens", JSON.stringify(token));
    };

    let logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem("authTokens");
    }

    let updateToken = async (refreshToken : String) => {

        let newToken = await handleUpdateToken(refreshToken);
        let setNewToken : tokenObject = {
            idToken: newToken.idToken,
            refreshToken: newToken.refreshToken,
            dateGetToken: new Date() 
        };

        setAuthToken(setNewToken);
        AsyncStorage.setItem("authTokens", JSON.stringify(setNewToken));
      
    
    }


    return (<AuthContext.Provider value={{
        token: authToken?.idToken,
        refreshToken: authToken?.refreshToken,
        isAuthenticated: !!authToken?.idToken,
        dateGetToken: authToken?.dateGetToken,
        updateToken: updateToken,
        getAuthToken: getAuthToken,
        logout: logout
    }}> 
       {children}
    </AuthContext.Provider>)
};

export default AuthContext;

