import React, { Component } from 'react'
import { Text, View , Button } from 'react-native'

export default class OrderHistory extends Component {
    static navigationOptions = {
        title: 'Order History',
    }
    render() {
        return (
            <View>
                <Text> OrderHistory </Text>
                <Button onPress={() => this.props.navigation.navigate('Home')} title="Click"></Button>
            </View>
        )
    }
}
