import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import LogIn from './screens/LogIn';
import AuthContext, { AuthProvider } from './store/context/AuthContext';
import ToDoPage from './screens/ToDoPage';
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleUpdateToken } from './http/http';
import axios from 'axios';
import Icon from './UI/Icon';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormToDo from './screens/FormToDo';
import colorList from './constants/constants';
import {Ionicons} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
let timerForRefreshToken = 10 * 1000;


export default function App () {

  const Authentication = () => {

    return (<Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Register" component={Register} initialParams={undefined} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Login" component={LogIn} initialParams={undefined} options={{
        headerShown: false
      }}/> 
    </Stack.Navigator>)
  }


  const NavigationApp = () => {

      const {isAuthenticated, token, logout} = useContext(AuthContext);

      const ToDoPages = () => {

        return (<Tab.Navigator initialRouteName="ToDoList" screenOptions={{
          headerStyle: {backgroundColor: colorList['light purple']},
          tabBarStyle: {backgroundColor: colorList['light purple']},
          headerRight: () => {
            return <Icon name="log-out-outline" onPress={logout} color={"black "}/>
          }
        }}>
          <Tab.Screen name="ToDoList" component={ToDoPage} initialParams={undefined} options={{
            title: "To Do List",  
            tabBarIcon: ({color}) => {
              return <Ionicons name="list-outline" size={24} color={color}/>
            },
            tabBarActiveTintColor: colorList.darkblue,
            tabBarInactiveTintColor: "black",
            headerTitle: "To Do List"
          }}/>
          
        </Tab.Navigator>)
          

      }

      return (<Stack.Navigator initialRouteName='Authentication'>
        
        {isAuthenticated === false && (<Stack.Screen name="Authentication" component={Authentication} initialParams={undefined} options={{
            headerShown: false
        }}/> )}
        {isAuthenticated === true && (
          <>
          <Stack.Screen name="TodoPage" component={ToDoPages} initialParams={undefined} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="FormToDo" component={FormToDo} initialParams={undefined} options={{
            title: "Form To Add Or Edit",
            headerStyle: {backgroundColor: colorList['light purple']},
            headerTitle: "Form To Add Or Edit",
          }}/>
          </>
        )}
        
      </Stack.Navigator>)
  }

  

  const RootApp = () => {
    
    const {getAuthToken, logout, isAuthenticated, dateGetToken, updateToken, token, refreshToken} = useContext(AuthContext);
  

    useEffect(() => {
        async function getToken () {
            let storedToken = await AsyncStorage.getItem("authTokens");

            if (storedToken) {
              getAuthToken(JSON.parse(storedToken));
            }

           
        }
        getToken();

      
      
    },[]);

    // useEffect(() => {

    //     if (isAuthenticated === true && refreshToken !== undefined) {

    //   let idInterval = setInterval(() => {
    //       updateToken(refreshToken.toString());
    //   }, 5000);

    //   return () => clearInterval(idInterval);
    // }
    // }, [isAuthenticated, refreshToken]);
    
      useEffect(() => {

        if (isAuthenticated === true && refreshToken !== undefined) {
            let idInterval = setInterval(() => {
              updateToken(refreshToken.toString());
            }, timerForRefreshToken);
            
            return () => clearInterval(idInterval);
        }

        

      },[isAuthenticated, refreshToken]);
 
    

    return <NavigationApp />
  }
 
 

  return (
        <>
        <Provider store={store}>
        <AuthProvider>
        <NavigationContainer>
            <RootApp />
        </NavigationContainer>
        </AuthProvider>
        </Provider>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
