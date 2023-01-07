import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";

function Loading({message}) {
  return (
    <View style={styles.screen}>
        <ActivityIndicator />
        <Text style={styles.text}> {message} </Text>
    </View>
  )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textAlign: "center"
    }
})

export default Loading