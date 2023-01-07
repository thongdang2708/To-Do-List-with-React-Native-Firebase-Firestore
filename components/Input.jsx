import React from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import colorList from '../constants/constants';


function Input({label, icon, textInputConfig, invalid, textInvalid}) {
    
  return (
    <View style={styles.inputContainer}>
        <Text style={[styles.label, invalid && styles.textError]}> {label.charAt(0).toUpperCase() + label.substring(1, label.length)} </Text>

        <View style={[styles.inputBox, invalid && styles.errorBox]}> 
        <Ionicons name={icon} color={"black"} size={16} style={styles.icon}/>
        <TextInput {...textInputConfig} style={[styles.textInput, label === "description" && styles.styleForDescription]}/>
        </View>
        {invalid && (
            <Text style={styles.textError}> {textInvalid}</Text>
        )}
    </View>
  )
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10
    },
    inputBox: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: "row",
        marginVertical: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: colorList.purple
    },
    styleForDescription: {
        height: 100,
        textAlignVertical: "top"
    },
    icon: {
        marginRight: 10,
        marginTop: 3
    },  
    label: {
        color: colorList['purple'],
        fontSize: 16
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 6
    },
    errorBox: {
        borderColor: colorList.red
    },
    textError: {
        color: colorList.red
    }
});

export default Input