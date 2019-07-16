import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { CartContext } from '../CartProvider'
const {width,height} = Dimensions.get("window")
export default class DetailProduct extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon onPress={()=> this.props.navigation.navigate('ProductList')} color={"#FF4136"} size={30} name="ios-arrow-dropleft"/>
                    <CartContext.Consumer>
                        {
                            ({addToCart}) => (
                                <Icon onPress={() =>addToCart(this.props.navigation.getParam('product'))} color={"#FF4136"} size={30} name="ios-cart"/>
                            )
                        }
                    </CartContext.Consumer>
                </View>
                <View style={styles.Detail}>
                    <View>
                        <View style={styles.imagePros}>
                            <Image style={styles.imgPro} source={{uri: this.props.navigation.getParam('product').images[0]}} />
                            <Image style={styles.imgPro}  source={{uri: this.props.navigation.getParam('product').images[1]}} />   
                        </View>
                        <View>
                            <View style={styles.titlePro}>
                                <Text style={styles.TextTitle}>{`${this.props.navigation.getParam('product').name} / $${this.props.navigation.getParam('product').price}`.toUpperCase()}</Text>
                            </View>
                            <Text style={styles.textChitiet}> 
                                {this.props.navigation.getParam('product').description}
                            </Text>
                            <View style={styles.bottomPro}>
                                <Text style={styles.catergoryList}>{this.props.navigation.getParam('product').material}</Text>
                                <View style={styles.wraperCate}>
                                    <Text style={styles.catergoryList}> Color Khakil</Text>
                                    <View style={styles.circleColor}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const widthImage = (width -50)*0.5
const heightImage = (widthImage/361)*452
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin: 10,
        padding: 10,
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
    },
    headerContainer: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    Detail :{
        flex: 1
    },
    imagePros: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imgPro: {
        width: widthImage,
        height: heightImage
    },
    titlePro: {
        height: 50,
        justifyContent: "center",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
        paddingLeft: 30
    },
    TextTitle: {
        fontSize: 20,
        fontFamily: "Avenir",
        fontWeight: "700",
        color: "#0d0d0d",
    },
    textChitiet:{
        color: "#666666",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "justify",
        marginVertical: 20,
        fontFamily: "Avenir",
    },
    bottomPro: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    wraperCate: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    catergoryList: {
        color: "#00e600",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Avenir",
    },
    circleColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "red",
        borderColor: "#000000",
        borderWidth: 0.5,
        marginLeft: 10
    }
})