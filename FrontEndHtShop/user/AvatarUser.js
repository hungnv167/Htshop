import React, { Component } from 'react'
import { Text, View ,Image, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native'
import jwt_decode from 'jwt-decode'
const { width, height} = Dimensions.get("window")
export default class AvatarUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            Islogin: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('token')
            .then(val => {
                if(val === null){
                    this.setState({
                        Islogin: false
                    })
                }else{
                    const decoded = jwt_decode(val)
                    this.setState({
                        first_name: decoded.first_name,
                        last_name: decoded.last_name,
                        email: decoded.email,
                        phone: decoded.phone,
                        address: decoded.address,
                        Islogin: true
                    })
                }
            })
            .catch(err=>console.log(err))
    }
    _logout = async () =>{
        try{
            await AsyncStorage.removeItem('token')
            await this.setState({
                Islogin: false
            })
            this.props.navigation.navigate('Signin')
        }
        catch(err){
            this.props.navigation.navigate('Home')
        }
    }


    JsxLogin = () => {
        if(this.state.Islogin === true){
            return (
            <View style={styles.container}>
                <View style={styles.profileAvt}>
                    <View style={styles.avatarContainer}>
                        <Image source={{uri:"https://banner2.kisspng.com/20180704/tss/kisspng-portgas-d-ace-one-piece-treasure-cruise-monkey-d-5b3cecb5069110.1814539115307194130269.jpg"}} 
                        style={{width:50, height: 50,borderRadius: 50/ 2}}/>
                    </View>
                    <Text style={styles.textName}>{`${this.state.first_name} ${this.state.last_name}`}</Text>
                </View>
                <View style={styles.styleMenu}>
                    <TouchableOpacity style={styles.styleOpacity} onPress={() => this.props.navigation.navigate('OrderHistory')}>
                        <Text style={styles.textOp}>ORDER HISTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.styleOpacity} onPress={() => this.props.navigation.navigate('ChangeInfo')}>
                        <Text style={styles.textOp} >CHANGE INFO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._logout} style={styles.styleOpacity}>
                        <Text style={styles.textOp}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>)
        }
        else if(this.state.Islogin === false){
            return(
                <View style={{height: height,justifyContent: "center"}}>
                    <TouchableOpacity style={{alignItems: "center"}} onPress={() => this.props.navigation.navigate('Signin')}>
                        <Text style={{fontSize: 20,color: "red"}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return (
            <View>
                {this.JsxLogin()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileAvt: {
        flexDirection: "row",
        alignItems: "center",
        height: height/5,
        paddingLeft: 10,
        backgroundColor: "#FFFFFF",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
    },
    avatarContainer: {
        paddingRight: 10
    },
    textName:{
        fontSize: 15,
        color: "#660033",
        fontWeight: "bold"
    },
    styleMenu: {
        paddingLeft: 30
    },
    styleOpacity : {
        height: height /10,
        justifyContent: "center"
    },
    textOp : {
        fontSize: 15,
        color: "#DDDDDD",
        fontWeight: "600"
    }
})
