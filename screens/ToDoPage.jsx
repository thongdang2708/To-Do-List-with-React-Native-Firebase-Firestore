import React, { useContext } from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllToDos } from '../store/redux/toDoActions';
import SingleToDo from '../components/SingleToDo';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import Icon from '../UI/Icon';
import AuthContext from '../store/context/AuthContext';
function ToDoPage() {

  //Set dispatch and navigation
  let dispatch = useDispatch();
  let navigation = useNavigation();

  //Get global state;
  let {todos} = useSelector((state) => state.todo);

  //Get context from user
  let {token} = useContext(AuthContext);

  //Set layout effect

  useLayoutEffect(() => {

    const handleMove = () => {
        navigation.navigate("FormToDo");
    }

    navigation.setOptions(({
      headerLeft: () => {
        return <Icon name="add-outline" onPress={handleMove}/>
      }
    }));
  },[navigation]);

  //Fetch to dos
  useEffect(() => {

      async function displayTodos () {
        // let localStorage = await AsyncStorage.getItem("authTokens");

        // let getToken;
        // if (localStorage) {
        //   getToken = JSON.parse(localStorage).idToken;
        // }

        let decoded =jwtDecode(token);

        let userId = decoded.user_id;
        console.log(decoded);

        dispatch(getAllToDos(userId));
        
      }
      displayTodos();

  },[token]);
  
  //Handle render single item
  const handleRenderItem = ({item}) => {

      let inputData = {
          id: item.id,
          name: item.name,
          description: item.description,
          date: item.date,
          finished: item.finished,
          userId: item.userId
      };
      
      
      
      return <SingleToDo {...inputData}/>

  }

  return (
    <View style={styles.listContainer}>
        <View>
            <FlatList data={todos} renderItem={handleRenderItem}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    listContainer: {
      marginVertical: 10,
      marginHorizontal: 15
    }
});

export default ToDoPage