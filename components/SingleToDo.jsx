import React from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native"; 
import {Ionicons} from "@expo/vector-icons";
import colorList from '../constants/constants';
import Icon from '../UI/Icon';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../store/redux/toDoActions';
import { useNavigation } from '@react-navigation/native';
import { updateItem } from '../store/redux/toDoActions';
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';


function SingleToDo({onPress, name, date, finished, id, description, userId}) {
    //Set dispatch and navigation
    let dispatch = useDispatch();
    let navigation = useNavigation();

    //Handle delete

    const handleDelete = () => {
        dispatch(deleteItem(id));
    }

    //Handle update
    
    const handleUpdate = () => {
        navigation.navigate("FormToDo", {
            id: id
        })
    }

    //Mark Done

    const markDoneOrNotDone = () => {

        if (checked == true) {
            dispatch(updateItem(id, {
                name: name,
                description: description,
                finished: false,
                date: date,
                userId: userId
            }))
            setChecked(false);
        } else {
            dispatch(updateItem(id, {
                name: name,
                description: description,
                finished: true,
                date: date,
                userId: userId
            }));
            setChecked(true);
        }
        

        
    };

    //Set state for check box 
    let [checked, setChecked] = useState(finished);


  return (
    <Pressable onPress={onPress}>
    <View style={styles.boxContainer}> 
        
        <View style={styles.firstBox}>
        <View style={styles.eachContainer}>
        <Text style={styles.text}> Name of to do: </Text>
        <Text style={[styles.specialNames, checked && styles.textDone]}> {name} </Text>
        </View>

        <View style={styles.eachContainer}>
        <Text style={styles.text}> Description  </Text>
        <Text style={[styles.specialNames, checked && styles.textDone]}> {description} </Text>
        </View>

        <View style={styles.eachContainer}>
        <Text style={styles.text}> Created Date: </Text>
        <Text style={styles.specialNames}> {date} </Text>
        </View>

        </View>

        <View style={styles.iconBoxContainer}>
            <CheckBox containerStyle={styles.checkBox} checked={checked} onPress={markDoneOrNotDone}/>
            <Icon name={"newspaper-outline"} color={colorList.gold} onPress={handleUpdate}/>
            <Icon name={"close-outline"} color={colorList.red} onPress={handleDelete}/>
        </View>
      
        
    </View>
    </Pressable>
  )
}
import { deleteToDo } from '../store/redux/toDoActions';

const styles = StyleSheet.create({
    boxContainer: {
        marginVertical: 10,
        backgroundColor: colorList['light purple'],
        padding: 10,
        borderRadius: 4,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.5,
        flex: 4,
        flexDirection: "row"
       
    },

    eachContainer: {
        marginVertical: 8
    },
    text: {
        fontSize: 14
    },
    textDone: {
        textDecorationLine: "line-through"
    },  
    specialNames: {
        fontWeight: "bold"
    },
    iconBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
       
        justifyContent: "space-around",
        flex: 1
    },
    firstBox: {
        marginRight: 10,
        maxWidth: "60%",
        flex: 3
    }
});

export default SingleToDo