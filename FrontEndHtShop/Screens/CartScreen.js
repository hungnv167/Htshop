import React, { Component } from 'react'
import { Text, View, Dimensions,Image,StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native'
import { CartContext } from '../components/CartProvider'
import { FlatList } from 'react-native-gesture-handler';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import urlDefault from '../config'
const {width,height} = Dimensions.get("screen")
export default class Shop extends Component {
    constructor(props){
        super(props)
        this.state = {
            _id: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('token')
            .then(val => {
                if(val !== null){
                    const decoded = jwt_decode(val)
                    this.setState({
                        _id: decoded._id,
                    })
                }
            })
            .catch(err=>console.log(err))
    }
    
    checkOut =   (total,check) =>{
        if(this.state._id === ''){
            this.props.navigation.navigate('Signin')
        }
        else{
            axios.post(`${urlDefault}/checkout`,{
                idUser: this.state._id,
                total: total()
            })
            .then(res =>{
                check()
            })
            .catch(err => console.log(err))
        }
    }

    showCart = () =>{
        return (
            <View style={{ justifyContent:"center",
            alignItems:"center" }}>
                <View style={{height: height/2,width: width-50}}>
                    <Image style={{flex: 1}} source={{uri: 'https://hottopic.scene7.com/is/image/HotTopic/10458844_hi?$pdp_hero_standard$'}}/>
                </View>
                <Text style={{fontSize: 20, marginBottom: 10}}>Giỏ hàng trống</Text>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeScreen')} style={{height: 30,backgroundColor: "#FF4136", justifyContent: "center", alignItems:"center"}}>
                    <Text style={{padding: 5,color: "#FFFFFF", fontWeight: "300"}}>Tiếp tục mua sắm</Text>
                </TouchableOpacity>
            </View>
        )
    }
    showDetail = ( item ) =>{
        const product = item.product
        this.props.navigation.navigate('ProductDetail',{product})
    }
    render() {
        return (
            <View style={styles.container}>
                    <View>
                        <CartContext.Consumer>
                            {
                                ({cartItem,removeItem,addToCartInScreen,deleteItem}) => {
                                    if(cartItem.length === 0){
                                        return this.showCart()
                                    }
                                    else{
                                        return (
                                            <FlatList
                                                keyExtractor={(item)=> `${item.product._id}`}
                                                data={cartItem}
                                                renderItem={({item})=>(
                                                    <View style={styles.aCart}>
                                                        <View>
                                                            <Image style={styles.imgCart} 
                                                            source={{uri:`${item.product.images[0]}`}} />
                                                        </View>
                                                        <View style={styles.totalName}>
                                                            <Text style={styles.totaltextName}>{item.product.name}</Text>
                                                            <Text style={styles.textTotal}>{`$ ${item.product.price}`}</Text>
                                                            <View style={styles.totalNumber}>
                                                                <TouchableOpacity onPress={() => addToCartInScreen(item)}>
                                                                    <Text style={{fontSize: 20}}>+</Text>
                                                                </TouchableOpacity>
                                                                <Text style={{fontSize: 20}}>{item.count}</Text>
                                                                <TouchableOpacity onPress={() =>removeItem(item)}>
                                                                    <Text style={{fontSize: 20}}>-</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={styles.detailX}>
                                                            <TouchableOpacity onPress={() => deleteItem(item)}>
                                                                <Text style={{fontSize:20,fontWeight: "700",color:"#AFAEAF"}}>X</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => this.showDetail(item)}>
                                                                <Text style={styles.textDetail}>SHOW DETAIL</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        )
                                    }
                                }
                            }
                        </CartContext.Consumer> 
                    </View>
                    <CartContext.Consumer>
                            {
                                ({getTotal, cartItem,checkOut}) => {
                                    if(cartItem.length === 0){
                                        return
                                    }else{
                                        return (<TouchableOpacity  style={styles.checkOut} onPress={() =>this.checkOut(getTotal,checkOut)}><View><Text style={styles.textCheckout}>{`TOTAL $${getTotal()} CHECKOUT NOW`}</Text></View></TouchableOpacity>)
                                    }
                                }
                            }
                    </CartContext.Consumer>
            </View>
        )
    }
}
const heightCart = height*0.25
const widthImg = (width - 50)/4
const heightImg = (widthImg/361)*452

const styles = StyleSheet.create({
    container: 
    {
        backgroundColor: "#FFFFFF",
        flex: 1
    },
    aCart: {
        height: heightCart,
        backgroundColor: "#FFFFFF",
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 10,
        marginRight:10,
        paddingHorizontal: 5
    },
    imgCart: {
        width: widthImg,
        height: heightImg
    },
    totalName:{
        justifyContent: "space-between",
        flex: 1,
        height: heightImg+ 10,
        paddingHorizontal: 5
    },
    totaltextName: {
        fontSize: 16,
        fontFamily: "Avenir",
        fontWeight: "700",
        color: "#AFAEAF",
    },
    textTotal: {
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "700",
        color: "#FF4136",
    },
    totalNumber:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    detailX: {
        justifyContent: "space-between",
        flex: 1,
        height: heightImg+ 10,
        alignItems: "flex-end"
    },
    textDetail: {
        fontSize: 12,
        color: "#FF4136",
        fontWeight: "600"
    },
    checkOut: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "#FF4136",
        height: 50,
        width: width - 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    textCheckout:{
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
        textTransform: "uppercase"
    }
})
