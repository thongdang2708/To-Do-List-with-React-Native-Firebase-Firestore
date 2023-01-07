
import { ENV_VAR } from "@env";
import axios from "axios";

//Handle Authentication 

const WEB_API_KEY = "AIzaSyCofJSOLpy4te_7KudKNLxP3DLdUHzjKi4";
const handleAuthentication = async (mode: string, email: string, password: string) => {
    
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${ENV_VAR}`;

    const response = await axios.post(URL,{
        email: email,
        password: password,
        returnSecureToken: true
    });

    const idToken = response.data.idToken;
    const refreshToken = response.data.refreshToken;

    let token = {
        idToken: idToken,
        refreshToken: refreshToken
    }
    return token;
};

//Handle Login

export const handleSignin = async(email: string, password: string) => {

    let token = await handleAuthentication("signInWithPassword", email, password);

    return token;
};

//Handle updated token

export const handleUpdateToken = async (refreshToken : String) => {

    let url = `https://securetoken.googleapis.com/v1/token?key=${ENV_VAR}`;

    let response = await axios.post(url, {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    });

    let token = {
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token
    }

    return token;
}

//Handle Register

export const handleSignup = async (email: string, password: string) => {

    let token = await handleAuthentication("signUp", email, password);

    return token;
}


