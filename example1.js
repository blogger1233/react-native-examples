import React from "react";
import { View, Text, StyleSheet, Animated ,Easing} from "react-native";
import {useEffect} from "react"
export default function App() {
  const animationValue = new Animated.ValueXY({ x: 1, y: 1 });
  useEffect(()=>{
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue,{
          duration:3000,
          toValue:{x:100,y:100},
          useNativeDriver:"false",
          easing:Easing.linear
        }),
        Animated.timing(animationValue,{
          duration:3000,
          toValue:{x:-100,y:-100},
          useNativeDriver:"false",
          easing:Easing.linear
        }),
        Animated.timing(animationValue,{
          duration:3000,
          toValue:{x:1,y:1},
          useNativeDriver:"false",
          easing:Easing.linear
        })
      ])
    ).start()
  },[animationValue])
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              { translateX: animationValue.x },
              { translateY: animationValue.y },
            ],
          },
        ]}
      >
        <Text style={styles.boxText}>Box</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    backgroundColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
