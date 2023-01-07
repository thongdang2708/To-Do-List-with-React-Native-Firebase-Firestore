import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Input from './Input';
import Button from '../UI/Button';
import { useState } from 'react';
import FlatButton from '../UI/FlatButton';
import { useNavigation } from '@react-navigation/native';

function AuthForm({isLogin, onAuthenticate, credentialIsValid}) {

    let {emailIsValid, passwordIsValid, checkEmailIsValid, checkPasswordIsValid} = credentialIsValid;

    //Set navigation

    let navigation = useNavigation();

    //Set state for input values

    let [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        checkEmail: "",
        checkPassword: ""
    });

    //Set changes for inputs

    const handleChange = (key, value) => {

        setInputValues((values) => {
            return {
                ...values,
                [key]: value
            }
        })
    };

    //Handle submit
    const handleSubmit = () => {
        let credentialValues = {
            email: inputValues.email,
            password: inputValues.password,
            checkEmail: inputValues.checkEmail,
            checkPassword: inputValues.checkPassword
        };

  
        onAuthenticate(credentialValues);
        setInputValues({
            email: "",
            password: "",
            checkEmail: "",
            checkPassword: ""
        })
    }

    //Handle moving between register and log in

    const handleMovingChange = () => {

        if (isLogin) {
            navigation.replace("Register");
        } else {
            navigation.replace("Login");
        }
    }


  return (
    <View style={styles.form}>
        <Input label={"email"} icon={"person"} textInputConfig={{
            placeholder: "Enter your email",
            autoCorrect: false,
            autoCapitalize: "none",
            value: inputValues.email,
            onChangeText: (text) => handleChange("email", text)
        }} isPassword={false} invalid={emailIsValid === false} textInvalid={"Email is invalid. Please check again!"}/>

        <Input label={"password"} icon={"compass-outline"} textInputConfig={{
            secureTextEntry: true,
            placeholder: "Enter your password",
            value: inputValues.password,
            onChangeText: (text) => handleChange("password", text)
        }} invalid={passwordIsValid === false} textInvalid={"Password is invalid. Please check again!"}/>

        {isLogin == false && (
             <Input label={"confirm email"} icon={"person-outline"} textInputConfig={{
                placeholder: "Confirm email",
                autoCorrect: false,
                autoCapitalize: "none",
                value: inputValues.checkEmail,
                onChangeText: (text) => handleChange("checkEmail", text)
            }} invalid={checkEmailIsValid === false} textInvalid={"Confirmed email is not the same to email or is not in a correct type!"}/> 
        )}

        {isLogin == false && (
             <Input label={"password"} icon={"shield-checkmark-outline"} textInputConfig={{
                placeholder: "Confirm password",
                secureTextEntry: true,
                value: inputValues.checkPassword,
                onChangeText: (text) => handleChange("checkPassword", text)
            }} invalid={checkPasswordIsValid === false} textInvalid={"Confirmed password is not the same to password or is not in a correct type!"}/>
        )}
        
        <Button onPress={handleSubmit}>
            {isLogin == false ? "Register" : "Log In"}
        </Button>
        
        <FlatButton onPress={handleMovingChange}>
            {isLogin == false ? "Have already account? Please log in" : "Don't you have an account? Please sign up"}
        </FlatButton>




    </View>
  )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    }
})

export default AuthForm