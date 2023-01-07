import React from 'react';
import {View, Text, Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function Icon({onPress, name, color}) {
  return (
    <Pressable onPress={onPress}>
    <View style={styles.iconContainer}>
        <Ionicons name={name} size={22} color={color === "" ? "black" : color}/>
    </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
    iconContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 2,
        marginHorizontal: 1
    }
});

export default Icon