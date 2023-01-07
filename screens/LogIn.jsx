import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContent from '../components/AuthContent';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loading from '../UI/Loading';
import { useContext } from 'react';
import AuthContext from '../store/context/AuthContext';
import { handleSignin } from '../http/http';
function LogIn() {

  let {getAuthToken} = useContext(AuthContext);

   //Set state for loading
   let [loading, setLoading] = useState(undefined);

   //Set navigation
   let navigation = useNavigation();
    
   //Handle login

  const handleLogin = async ({email, password}) => {
      setLoading(true);

      try {

        let token = await handleSignin(email, password);

        getAuthToken(token);

      } catch (error) {
        Alert.alert("Sign in fail!", "Something wrong with your inputs! or this user does not exist!");
        setLoading(false);
      }
  }

  if (loading) {
    return <Loading message={"Logging in for user!"}/>
  }

  return (
    <AuthContent isLogin={true} title={"Sign in"} subtitle={"Please sign in to log in"} onAuthenticate={handleLogin}/>
  )
}

const styles = StyleSheet.create({
    
});

export default LogIn