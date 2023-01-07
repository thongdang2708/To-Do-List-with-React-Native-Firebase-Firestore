import React from 'react';

import {View, Text, Pressable, StyleSheet} from "react-native";
import colorList from '../constants/constants';

function Button({onPress, buttonContent, style, children}) {
  return (
    <View style={[styles.outerContainer, style]}>
    <Pressable onPress={onPress} android_ripple={{color: colorList['light gray']}} style={({pressed}) => pressed && styles.pressedEffect}>
    <View style={styles.innerButtonContainer}>
        <Text style={styles.textButton}> {children} </Text> 
    </View>
    </Pressable>
    </View>
  )
}

const styles = {
    outerContainer: {
        marginVertical: 15,
        overflow: "hidden"
    },
    innerButtonContainer: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: colorList['light gray'],
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 12,
        backgroundColor: colorList.purple,
        borderRadius: 4,
        overflow: "hidden"
    },
    pressedEffect: {
        opacity: 0.45
    },
    textButton: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    }
}

export default Button