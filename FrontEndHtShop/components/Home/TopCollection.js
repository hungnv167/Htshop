import React, { Component } from 'react'
import { Text, View , StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'

const {width, height } = Dimensions.get("window")
export default class TopCollection extends Component {
    render() {
        const {container, title,bodyCollectionTop,imageTop,detailProduct,productName,productPrice,productPadding,titleContainer} = styles
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>TOP PRODUCT</Text>
                </View>
                <View style={bodyCollectionTop}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList') }>
                        <View style={detailProduct}>
                            <View>
                                <Image style={imageTop} 
                                source={{uri:'http://bansithoitrang.net/wp-content/uploads/ao-thun-nam-co-tron-hollister-in-cao-cap-758-224.png'}} />
                            </View>
                            <View style={productPadding}>
                                <Text style={productName}>T-Shirt</Text>
                                <Text style={productPrice}>$919</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList') }>
                        <View style={detailProduct}>
                            <View>
                                <Image style={imageTop} 
                                source={{uri:'https://panpan.vn/wp-content/uploads/ao-thun-nam-co-tron-hollister-in-cao-cap-696-629.png'}}/>
                            </View>
                            <View style={productPadding}>
                                <Text style={productName}>T-Shirt</Text>
                                <Text style={productPrice}>$298</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList') }>
                        <View style={detailProduct}>
                            <View>
                                <Image style={imageTop} 
                                source={{uri:'https://aothunphongcach.com/upload/product/i4094-ao-thun-nam-in-hinh-hrarkrs-team-ca-map-512.jpg'}}/>
                            </View>
                            <View style={productPadding}>
                                <Text style={productName}>T-Shirt</Text>
                                <Text style={productPrice}>$39</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList') }>
                        <View style={detailProduct}>
                            <View>
                                <Image style={imageTop} 
                                source={{uri:'http://hinhanh.tonghopnhanh.com/upload/hinhanh/chitiet/hinhgoc/30/danh-sach-cac-mau-ao-thun-nam-dep-nhat-hien-nay-13066-79600-0.jpg'}}/>
                            </View>
                            <View style={productPadding}>
                                <Text style={productName}>T-Shirt</Text>
                                <Text style={productPrice}>$179</Text>
                            </View>
                        </View>
                    </TouchableOpacity> 
                </View>
            </View>
        )
    }
}

const widthImage = (width - 50)/2
const heightImage = (widthImage/361)*452
const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: "#FFFFFF",
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2
    },
    titleContainer: {
        marginBottom:10
    },
    title:{
        fontSize: 20,
        color: "#AFAEAF",
        fontFamily: "Avenir",
    },
    bodyCollectionTop:{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    detailProduct:{
        width: widthImage,
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        marginBottom: 10,
        backgroundColor:"#FFFFFF"
    },
    imageTop:{
        width: widthImage,
        height: heightImage
    },
    productPadding:{
        paddingLeft: 10,
        paddingVertical:10
    },
    productName:{
        color: "#AFAEAF",
        fontSize: 15,
        fontFamily: "Avenir",
    },
    productPrice: {
        fontSize: 15,
        color: "#FF4136",
        fontFamily: "Avenir",
    }
})