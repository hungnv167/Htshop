import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Collection from '../components/Home/Collection';
import CategorySilide from '../components/Home/CategorySilide';
import TopCollection from '../components/Home/TopCollection';

export default class HomeScreen extends Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.wapper}>
                <ScrollView>
                    <Collection/>
                    <CategorySilide navigation={navigation}/>
                    <TopCollection navigation={navigation}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wapper: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
})
