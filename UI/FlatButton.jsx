import React from 'react';

import {View, Text, Pressable, StyleSheet} from "react-native";
import colorList from '../constants/constants';

function FlatButton({onPress, buttonContent, style, children}) {
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

const styles = StyleSheet.create({
    outerContainer: {
        marginVertical: 15

    },
    innerButtonContainer: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: colorList['light gray'],
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 12,
        borderRadius: 4
    },
    pressedEffect: {
        opacity: 0.45
    },
    textButton: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    }
});
export default FlatButton