import React, { Component } from 'react'
import { View, Text , Dimensions, StyleSheet} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons'
import { CartContext } from "../components/CartProvider";
const {height} = Dimensions.get("window")
const {width} = Dimensions.get("window")
export default class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : ''
        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.topHeader}>
                    <Icon onPress={this.props.navi} style={styles.iconLeft} name="md-menu"/>
                    <Text style={styles.LogoText}>TH Shop</Text>
                    <Icon style={styles.iconRight} name="md-person"/>
                </View>
                <View>
                    <CartContext.Consumer>
                    {({searchItem}) =>(
                            <TextInput onFocus={this.props.navigation} onSubmitEditing={() =>searchItem(this.state.text)}
                            onChangeText={(text) => this.setState({text})} style={styles.inputText} placeholder="What do you want to buy?"/>
                    )}
                    </CartContext.Consumer>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper : {
        height: height/7,
        backgroundColor: '#FF4136',
        padding: 10
    },
    topHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconLeft:{
        color: "#FFFFFF",
        fontSize: 25,  
    },
    iconRight: {
        color: "#FFFFFF",
        fontSize: 25,  
    },
    inputText : {
        backgroundColor: "#FFFFFF",
        height: height/23,
        paddingLeft: 20
    },
    LogoText:{
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Avenir"
    }
})
