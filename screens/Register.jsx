import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContent from '../components/AuthContent';
import { handleSignup } from '../http/http';
import Loading from '../UI/Loading';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


function Register() {

    //Set state for loading
    let [loading, setLoading] = useState(undefined);

    //Set navigation
    let navigation = useNavigation();

    //Handle register
    const handleRegister = async ({email, password}) => {
        setLoading(true);

        try {

        await handleSignup(email, password);
        
        navigation.replace("Login");
        } catch (error) {   
            Alert.alert("Sign up fail!", "This user signed up with this email")
            setLoading(false);
        }
        
    }  

    //Return when loading is true

    if (loading) {
        return <Loading message={"Registering user!"}/>
    }
     

  return (
        <AuthContent isLogin={false} title={"Register"} subtitle={"Please sign up to register"} onAuthenticate={handleRegister} />
  )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    mainContent: {
        paddingVertical: 20,
        paddingHorizontal: 40
    }
});

export default Register