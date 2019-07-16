import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Badge, Icon } from 'react-native-elements'
import { CartContext } from '../components/CartProvider'

export default class IconCart extends Component {
    render() {
        return (
            <View style={{ width: 25, height: 25, margin: 5 }}>
                <Icon color={this.props.color} size={25} type="ionicon" name={this.props.name} />
                <CartContext.Consumer>
                    {
                        ({cartItem}) => {
                            if(cartItem.length === 0 || this.props.name !== 'md-cart'){
                                return
                            }else {
                                return (
                                    <Badge value={cartItem.length} status="success"
                                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
                                )
                            }
                        }
                    }
                </CartContext.Consumer>
            </View>
        )
    }
}
