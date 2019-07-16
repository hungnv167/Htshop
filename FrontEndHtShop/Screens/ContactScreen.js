import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Contact extends Component {
    render() {
        return (
            <View style={{flex: 1,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor:'#FFFFFF'}}>
                <Text style={{fontSize: 20}}> Đây là màn hình Liên Hệ nhưng đang đợi nâng cấp 🥶🥶🥶</Text>
            </View>
        )
    }
}
