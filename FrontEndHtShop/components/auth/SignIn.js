import React, { Component } from 'react'
import { Dimensions, Text, View , Button, TextInput,AsyncStorage, TouchableOpacity,StyleSheet} from 'react-native'
import urlDefault from '../../config'
import axios from 'axios'
const {height, width } = Dimensions.get("window")
const userTest = {email: 'test@gmail.com', password: '123456'}
export default class SignIn extends Component {
    static navigationOptions = {
        title: 'TH Shop',
    }
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    _login =   () => {
        axios.post(`${urlDefault}/users/login`,
            {   email: this.state.email,
                password: this.state.password
            }
        ).then((res)=>{
            if(res.data.error){
                alert(res.data.error)

            }else{
                AsyncStorage.setItem('token',res.data)
                this.props.navigation.navigate('Home')
            }
        })
        .catch((error) =>console.log(error))
    }
    render() {
        return (       
            <View  style={styles.wrapper}>
                <View>
                    <TextInput autoCapitalize="none" value={this.state.email} onChangeText={(email) => this.setState({email})} style={styles.inputText} placeholder= "Enter your email"/>
                    <TextInput secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({password})} style={styles.inputText} placeholder= "Enter your password"/>
                    <TouchableOpacity onPress={this._login} style={styles.signNow}>
                        <Text style={styles.textSign}>SIGNIN NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputText : {
        height: 50,
        width: width - 50,
        paddingLeft: 10,
        shadowColor: "#2E272B",
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.2,
        backgroundColor: "#FFFFFF",
        marginBottom: 20,
        borderRadius: 5,
        fontFamily: "Avenir",
    },
    signNow : {
        height: 60,
        backgroundColor: "#FF4136",
        justifyContent: "center",
        alignItems: "center"
    },
    textSign : {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        fontFamily: "Avenir",
    }
})