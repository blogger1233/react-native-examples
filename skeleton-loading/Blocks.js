import {Text,View,StyleSheet} from "react-native"
import Images from "./Images";
import {useFonts} from "expo-font"
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";
export default function Blocks({item}) {
    const [loaded]=useFonts({
        "font":require("./assets/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf")
    })
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false)
        },3000)
    },[])
    return (
        <View style={styles.blocks} key={item.id}>

            <Images src={item.image}/>
            <View style={styles.textBlock}>
                {loader?<Skeleton/>:<><Text style={styles.heading}>
                    {item.name}
                </Text>
                <Text style={styles.para}>
                    {item.desc}
                </Text></>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    blocks:{
        marginTop:10,
        padding:5,
        backgroundColor:"white",
        elevation:5,
        flexDirection:"row",
        borderRadius:10,

    },
    heading:{
        fontFamily:"font",
        fontSize:15,

    },
    textBlock:{
        marginLeft:10,
        flex:1,

    },
    para:{
        marginTop:10,
        color:"grey",
        fontFamily:"font"
    }
})
