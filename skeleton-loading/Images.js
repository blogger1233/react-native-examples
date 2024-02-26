import React, { useState, useEffect } from "react";
import { View, Image, Animated, Easing } from "react-native";

export default function Images({ src }) {
  const [isLoading, setLoading] = useState(true);
  const [value] = useState(new Animated.Value(54));

  useEffect(() => {
    setTimeout(()=>{
        setLoading(false)
    },3000)
    const animation1 = Animated.timing(value, {
      toValue: 86,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    const animation2 = Animated.timing(value, {
      toValue: 35,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    Animated.loop(Animated.sequence([animation1, animation2])).start();
  }, [value]);

  return (
    <Animated.View
      style={{
        backgroundColor: isLoading
          ? value.interpolate({
              inputRange: [0, 100],
              outputRange: [`hsl(0, 0%, 0%)`, `hsl(0, 0%, 100%)`],
            })
          : "white",
      }}
    >
      <Image
        source={{ uri: src }}
        style={{ width: 100, height: 100, opacity: isLoading ? 0 : 1,borderRadius:10 }}
        // onLoad={() => setLoading(false)}
      />
    </Animated.View>
  );
}
