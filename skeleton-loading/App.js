import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, StatusBar, FlatList } from "react-native";
import Blocks from "./Blocks";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = require("./data.json");
        setData(jsonData);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <View style={styles.container}>

      <StatusBar/>
      <Text style={{padding:10,fontFamily:"font",fontSize:20}}>
        Famous Personalities💻
      </Text>
      <FlatList
        style={{padding:10}}
        data={data}
        renderItem={({ item }) =>  <Blocks item={item}/>}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",

  },
});
