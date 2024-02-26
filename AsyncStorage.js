import AsyncStorage from "@react-native-async-storage/async-storage"
import {View,StyleSheet,Text,StatusBar} from "react-native"
import {useEffect} from "react"
export default function App()
{
  const storeData = async ()=>{
    try{
      await AsyncStorage.setItem("key","dhruv kumar yadav")
      console.log("data stored successfully")
      }
    catch(err){
      console.log(err)
    }
  }
  const getData = async ()=>{
    try{
      const value = await AsyncStorage.getItem("key")
      if(value!==null){
        console.log("stored Data is: "+value)
      }
    }
    catch(err){
      console.log("error")
    }
  }
  useEffect(()=>{
    storeData()
    getData()
  },[])
  return(<View style={styles.container}>
    <StatusBar/>
    <Text>
      Async Storage Library
    </Text>
  </View>)
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"space-around",
    alignItems:"center"
  }
})
