import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import FormForToDo from '../components/FormForToDo';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../UI/Button';
import { useState } from 'react';
import { addToDo } from '../store/redux/toDoActions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { resetAfterAddingToDo } from '../store/redux/toDoActions';
import { updateItem } from '../store/redux/toDoActions';
import { ImageBackground } from 'react-native';

function FormToDo({route}) {

    //Get param

    let idItem = route.params?.id;
    let isItem = !!idItem;
   


    //Set dispatch and navigation
    let dispatch = useDispatch();
    let navigation = useNavigation();

    //Set global state from to dos

    let {todo, todos, isSuccess, isError, message} = useSelector(state => state.todo);

    //Get item based on id
    let singleItem;
    if (isItem) {
        singleItem = todos.filter((todo) => todo.id === idItem)[0];
    }
    console.log(singleItem);

    //Set conditions for input

    let [inputCheck, setInputCheck] = useState({
        nameIsValid: undefined,
        descriptionIsValid: undefined
    });

    //Set state for form to add to do
    let [inputValues, setInputValues] = useState({
        name: isItem ? singleItem.name : "",
        description: isItem ? singleItem.description : "",
    });


    //Handle Changes
    
    const handleChange = (key, value) => {

        setInputValues((inputValue) => {
            return {
                ...inputValue,
                [key]: value
            }
        })
    };

    //Handle Submit
    const handleSubmit = () => {
        
        let inputs = {
            name: inputValues.name,
            description: inputValues.description,
            date: new Date().getDate() + "-" + new Date().toLocaleDateString("en-US", {month: "long"}) + "-" + new Date().getFullYear()
        }

        let nameIsValid = inputs.name.length > 3;
        let descriptionIsValid = inputs.description.length > 5;

        if ((nameIsValid === false || descriptionIsValid === false) && isItem === false) {
            setInputCheck((inputCheck) => {
                return {
                    nameIsValid: nameIsValid,
                    descriptionIsValid: descriptionIsValid
                }
            })

            setTimeout(() => {
                setInputCheck((inputCheck) => {
                    return {
                        nameIsValid: undefined,
                        descriptionIsValid: undefined
                    }
                })
            }, 5000);
            return;
        } else {
        
           
           

            if (isItem) {
                dispatch(updateItem(idItem, {
                    name: inputValues.name,
                    description: inputValues.description,
                    finished: singleItem.finished,
                    date: singleItem.date,
                    userId: singleItem.userId
                }));

            } else {
                inputs.finished = false;
                dispatch(addToDo(inputs));
            }

            setInputValues((inputValue) => {
                return {
                    name: "",
                    description: ""
                }
            });
           
        } 
       
    }

    //Set effect when adding

    useEffect(() => {

        if (isSuccess) {
            navigation.navigate("ToDoList");
        } else if (isError) {
            Alert.alert("Add fails", message);
        }

        dispatch(resetAfterAddingToDo());
        
        

    },[isSuccess, isError, message]);



  return (
    <ImageBackground source={require("../assets/form.jpg")} imageStyle={styles.imageStyle} style={styles.formScreen}>
    <View style={styles.formPageContainer}>
        <Text style={styles.title}> {isItem ? "Update To Do" : "Add To Do"} </Text> 

        <View style={styles.inputsContainer}>
            <Input label={"Name of to do"} textInputConfig={{
                placeholder: "Enter a name for to do!",
                autoCapitalize: "none",
                autoCorrect: false,
                value: inputValues.name,
                onChangeText: (text) => handleChange("name", text)
            }} invalid={inputCheck.nameIsValid === false} textInvalid="Name must checked again!"/>

            <Input label={"description"} textInputConfig={{
                multiline: true,
                numberOfLines: 14,
                value: inputValues.description,
                placeholder: "Enter a description",
                onChangeText: (text) => handleChange("description", text),
            }} invalid={inputCheck.descriptionIsValid === false} textInvalid="Description must be checked again!"/>

            <Button onPress={handleSubmit}>
                {isItem ? "Update To Do" : "Add To Do"}
            </Button>
        </View>
    </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
    formPageContainer: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black"
    },
    inputsContainer: {
        marginVertical: 25
    },
    imageStyle: {
        opacity: 0.20
    },
    formScreen: {
        flex: 1
    }
});

export default FormToDo