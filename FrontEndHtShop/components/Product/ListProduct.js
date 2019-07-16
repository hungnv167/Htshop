import React, { Component } from 'react'
import { Text, View , Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import axios from 'axios'
import urlDefault from '../../config'
import { FlatList } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get("window")
export default class ListProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            products : []
        }
    }
    componentDidMount() {
        axios.get(`${urlDefault}/get_all_product`)
            .then(res =>{
                this.setState({
                    products: res.data.data
                })
            })
            .catch(err => console.error(err))
    }
    goDetail = (product) =>{
        this.props.navigation.navigate('ProductDetail',
                                {   
                                    product
                                })
    }
    showData = ()  =>{
        return (<FlatList contentContainerStyle={{padding:10}} data={this.state.products}
               renderItem={({item}) =>(
                <View style={styles.listProContent}>
                    <View style={styles.onPro}>
                        <Image style={styles.imagePro} source={{uri: `${item.images[0]}`}}/>
                        <View style={styles.detailPro}>
                            <Text style={styles.textName}>{item.name}</Text>
                            <Text style={styles.total}> {`$${item.price}`}</Text>
                            <Text style={styles.mota}>{item.material}</Text>
                            <View style={styles.bottomPro}>
                                <Text style={styles.colorPro}>{item.color}</Text>
                                <View style={styles.circlePro}></View>
                                <TouchableOpacity onPress={()=> this.goDetail(item)  }>
                                    <Text style={styles.showDetail}>SHOW DETAIL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
               )} keyExtractor={(item)=> `${item._id}`}/>)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerList}>
                    <View style={styles.header}>
                        <Icon onPress={()=> this.props.navigation.navigate('Home')} style={styles.iconText} name={"ios-arrow-dropleft"} size={30} color={"#FF4136"} />
                        <Text style={styles.textPro}>Party Ardess</Text>
                    </View>
                </View>
                {this.showData()}
            </View>
        )
    }
}

const widthImage = (width -50)*0.3
const heightImage = (widthImage/361)*452
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin: 10,
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
    },
    headerList : {
        backgroundColor: "#FFFFFF",
        height: 50,
    },
    header: {
        flexDirection: "row",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        alignItems: "center",
        flex: 1
    },
    iconText : {
        flex: 2,
        paddingLeft: 10
    },
    textPro : {
        flex: 4,
        fontSize: 20,
        fontFamily: "Avenir",
        fontWeight : "600",
        color: "#FF4136"
    },
    listProContent: {
        flex: 1,
        padding: 10
    },
    onPro: {
        flexDirection: "row",
        height: heightImage +20,
        alignItems: "center",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        paddingBottom: 15
    },
    imagePro: {
        width: widthImage,
        height: heightImage
    },
    detailPro: {
        justifyContent: "space-between",
        height: heightImage + 20,
        flex: 1,
        paddingLeft: 15
    },
    textName : {
        fontSize: 18,
        fontFamily: "Avenir",
        fontWeight: "500",
        color: "#AFAEAF",
        letterSpacing: 1
    },
    total: {
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "bold",
        color: "#FF4136"
    },
    mota: {
        fontFamily: "Avenir",
    },
    bottomPro: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center"
    },
    colorPro: {
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "500",
    },
    circlePro: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "red"
    },
    showDetail: {
        fontSize: 12,
        fontFamily: "Avenir",
        fontWeight: "500",
        color: "#FF4136"
    }
})