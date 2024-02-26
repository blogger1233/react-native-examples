import React, { useEffect, useState } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";

export default function Skeleton() {
    const [value] = useState(new Animated.Value(54));
    const [array] = useState(new Array(10).fill(new Animated.Value(0))); // Initialize each element in the array with an Animated.Value

    useEffect(() => {
        const animation1 = Animated.timing(value, {
            toValue: 86,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        });
        const animation2 = Animated.timing(value,{
            toValue: 35,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        });
        Animated.loop(Animated.sequence([
            animation1,
            animation2
        ])).start();
    }, [value]);

    return (
        <View>
            <Animated.View style={{ ...styles.heading, backgroundColor: value.interpolate({ inputRange: [0, 100], outputRange: [`hsl(0, 0%, 0%)`, `hsl(0, 0%, 100%)`] }) }}></Animated.View>
            {
                array.map((animatedValue, index) => {
                    return (
                        <Animated.View key={index} style={{ ...styles.para, backgroundColor: value.interpolate({ inputRange: [0, 100], outputRange: [`hsl(0, 0%, 0%)`, `hsl(0, 0%, 100%)`] }) }}></Animated.View>
                    );
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        padding: 10,
        borderRadius: 4
    },
    para: {
        marginTop: 3,
        padding: 4,
        borderRadius: 2
    }
});
