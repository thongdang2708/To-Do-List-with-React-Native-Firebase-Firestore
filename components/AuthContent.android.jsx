
import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import colorList from '../constants/constants';
import AuthForm from './AuthForm';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

function AuthContent({isLogin, title, subtitle, onAuthenticate}) {

    //Set state for checking credentials;

    let [credentialIsValid, setCredentialIsValid] = useState({
      emailIsValid: undefined,
      passwordIsValid: undefined,
      checkEmailIsValid: undefined,
      checkPasswordIsValid: undefined
  });

  //Handle values for form

  const handleValues = (inputValues) => {
      
      let {email, password, checkEmail, checkPassword} = inputValues;
      
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

      let emailIsValid = emailRegex.test(email);
      let passwordIsValid = passwordRegex.test(password);
      let checkEmailIsValid = isLogin == false ? checkEmail === email && emailRegex.test(checkEmail) : true;
      let checkPasswordIsValid = isLogin == false ? checkPassword === password && passwordRegex.test(checkPassword) : true;

      if (emailIsValid === false || passwordIsValid === false || checkEmailIsValid === false || checkPasswordIsValid === false) {
          setCredentialIsValid((credentials) => {
              return {
                  emailIsValid: emailIsValid,
                  passwordIsValid: passwordIsValid,
                  checkEmailIsValid: checkEmailIsValid,
                  checkPasswordIsValid: checkEmailIsValid
              }
          })
          setTimeout(() => {
              setCredentialIsValid((credentialIsValid) => {
                  setCredentialIsValid((credentials) => {

                  return {
                      emailIsValid: "",
                      passwordIsValid: "",
                      checkEmailIsValid: "",
                      checkPasswordIsValid: ""
                  }
                  })
              })
          }, 2000);
          return;
      } else {
        onAuthenticate({
          email: email,
          password: password,
         
      });
      }

      

  }

  return (
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen}>
        <View style={styles.mainContent}>
        <Text style={styles.title}> {title} </Text>
        <Text style={styles.subtitle}> {subtitle}</Text>
        <AuthForm isLogin={isLogin} onAuthenticate={handleValues} credentialIsValid={credentialIsValid}/>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
      flex: 1
  },
  mainContent: {
      paddingVertical: 20,
      paddingHorizontal: 40
  },
  title: {
      fontSize: 40,
      fontWeight: "bold"
  },
  subtitle: {
      marginTop: 10,
      color: colorList.bluegray
  }
})

export default AuthContent;