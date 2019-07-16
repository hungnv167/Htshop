import React, { Component } from 'react'
import { Text, View , StyleSheet,Dimensions, Image } from 'react-native'

const {height, width} = Dimensions.get("window")
export default class Collection extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View>
                    <Text style={styles.styleText}>SPRING COLLECTION</Text>
                </View>
                <View style={styles.wrapperImg}>
                    <Image style={styles.ImageCollection} source={{uri: 'http://1.bp.blogspot.com/-VzGcQG2lKBA/UKaURFltJ3I/AAAAAAAAANI/WK36aiI3X6c/s1600/5%EA%B0%9C%EB%B8%8C%EB%9E%9C%EB%93%9C.jpg'}}/>
                </View>
            </View>
        )
    }
}
const widthImage = width - 40
const heightImage = (widthImage/993)*465
const styles = StyleSheet.create({
    wrapper:{
        height: height*0.3,
        margin: 10,
        backgroundColor: "#FFFFFF",
        padding: 10,
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2
    },
    styleText:{
        fontSize: 20,
        color: "#AFAEAF",
        fontFamily: "Avenir",
    },
    wrapperImg:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ImageCollection:{
        width: widthImage,
        height: heightImage
    }
})