
import axios from "axios";
import {collection, addDoc, query, where, getDocs, DocumentData, getDoc, doc, setDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {db, auth} from "../firebase/firebase";
import jwt_decoded from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import { cloneElement } from "react";

//Set constant varibles;
let collectionNameForToDo = "todolist";


//Set interface

type inputsToDoProps = {
    input: {
        name: String,
        description: String,
        date: String,
        finished: boolean
    },
    updateInputs: {
        name: String,
        description: String,
        date: String,
        finished: boolean, 
        userId: String
    }
}

type passedProps = {
    id: String,
    name: String,
    description: String,
    userId: String,
    finished: boolean
}


//Add To Do


export const addToDo = (inputsToDo : inputsToDoProps["input"]) => async (dispatch : any, getState : any) => {

    let localStorage = await AsyncStorage.getItem("authTokens");

    let getToken;

    if (localStorage) {
        getToken = JSON.parse(localStorage).idToken;
    }

    let decoded = jwt_decoded(getToken);
    let userId = (decoded as any).user_id;

    let newObject = {
        name: inputsToDo.name,
        description: inputsToDo.description,
        date: inputsToDo.date,
        finished: inputsToDo.finished,
        userId: userId
    }

    try {
    
    let docRef = await addDoc(collection(db, "todolist"), newObject);
    
    let createdObject = {
        name: newObject.name,
        description: newObject.description,
        date: newObject.date,
        finished: newObject.finished,
        userId: newObject.userId,
        id: docRef.id
    }
    
    
    dispatch({
        type: "ADD_TO_DO_SUCCESS",
        payload: createdObject
    });

    } catch (error) {  
        dispatch({
            type: "ADD_TO_DO_FAIL",
            payload: "Add to do fail!"
        })
    }
    
   
}

//Delete doc

export const deleteItem = (id : string) => async (dispatch : any, getState : any) => {
    console.log(id);
    let getSingleDoc = doc(db, "todolist", id);

    deleteDoc(getSingleDoc).then(() => {
        console.log("delete well!")
    });

    dispatch({
        type: "DELETE_ITEM",
        payload: id
    })
    
}

// Update to do item

export const updateItem = (id : string, inputs : inputsToDoProps["updateInputs"]) => async (dispatch : any, getState : any) => {

    let getSingleDoc = doc(db, "todolist", id);

    await setDoc(getSingleDoc, inputs).then(() => console.log("Successfully!"));
    
    let updatedObject = {
        id: id,
        ...inputs
    }

    dispatch({
        type: "UPDATE_ITEM",
        payload: updatedObject
    })

}


//Get all to dos

export const getAllToDos = (userId : string) => async (dispatch : any, getState : any) => {

    let getQuery = query(collection(db, "todolist"), where("userId", "==", userId));

    let getDoc = await getDocs(getQuery);

    let listToDos : DocumentData[] = [];
    getDoc.forEach((doc) => {
        let todo = doc.data();
        todo.id = doc.id;
        listToDos.push(todo);
    });


    dispatch({
        type: "GET_ALL_TO_DOS",
        payload: listToDos
    });

    
    
}

//Reset state 

export const resetAfterAddingToDo = () => async (dispatch : any, getState : any) => {

    dispatch({
        type: "RESET_STATE"
    });
}