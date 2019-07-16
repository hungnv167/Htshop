import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import { 
    createSwitchNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createBottomTabNavigator
 }  from 'react-navigation'
import Icon from '@expo/vector-icons/Ionicons'
import OrderHistoryScreen from '../components/OrderHistory'
import ChangeInfoScreen from '../components/ChangeInfo'
import HomeScreen from '../Screens/HomeScreen'
import CartScreen from '../Screens/CartScreen'
import ContactScreen from '../Screens/ContactScreen'
import SearchScreen from '../Screens/SearchScreen'
import SearchInput from '../components/SearchInput';
import AvatarUser from '../user/AvatarUser';
import SignInScreen from '../components/auth/SignIn'
import ProductListScreen from '../components/Product/ListProduct'
import ProductDetailScreen from '../components/Product/DetailProduct'
import IconCart from '../components/IconCart';
const AppTabNavigator = createBottomTabNavigator({
    HomeScreen,
    CartScreen,
    ContactScreen,
    SearchScreen
},
{   initialRouteName:'HomeScreen',
    defaultNavigationOptions:({navigation}) =>({
        tabBarIcon: ({tintColor}) =>{
            let { routeName } = navigation.state
            let iconName
            if(routeName === 'HomeScreen'){
                iconName ='md-home'
            }
            if(routeName === 'CartScreen'){
                iconName ='md-cart'
            }
            if(routeName === 'ContactScreen'){
                iconName ='md-contact'
            }
            else if(routeName === 'SearchScreen'){
                iconName ='md-search'
            }
            return <IconCart name = {iconName} color={tintColor}/>
        },
    
    }),
    tabBarOptions:{
        inactiveTintColor: 'gray',
        showLabel: false,
        activeTintColor: "#FF4136",
    },
})
const AuthStackNavigator = createStackNavigator({
    Signin: {
        screen: SignInScreen
    },
    OrderHistory: {
        screen : OrderHistoryScreen
    },
    ChangeInfo:{
        screen : ChangeInfoScreen
    },
},{
    defaultNavigationOptions:({navigation}) =>({
        headerLeft: (<Icon onPress={() => navigation.navigate('Home')} name="ios-arrow-round-back" paddingLeft= "10" color={"#FFFFFF"} size={40}/>),
        headerLeftContainerStyle:{paddingLeft: 10},
        headerStyle:{
            backgroundColor: "#FF4136",
            borderBottomWidth: 0,
        }
        ,headerTintColor: '#FFFFFF'
    })
})
const ProductStackNavigator = createStackNavigator({
    ProductList : {
        screen: ProductListScreen
    },
    ProductDetail: {
        screen: ProductDetailScreen
    }
},{
    defaultNavigationOptions: ({navigation}) =>({
        header: null 
    })
})
const AppStackNavigator = createStackNavigator({
    Home: {
        screen: AppTabNavigator
    },
    Product: {
        screen: ProductStackNavigator
    }
},{
    defaultNavigationOptions: ({navigation}) =>({
        header: <SearchInput navigation ={() =>navigation.navigate('SearchScreen')} navi ={() => navigation.openDrawer()}/> 
    })
})


const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen : AppStackNavigator
    }
},
{
    contentComponent: AvatarUser
})
const AppSwitchNavigator = createSwitchNavigator({
    Home: {
        screen : AppDrawerNavigator
    },
    Auth: {
        screen: AuthStackNavigator
    }   
})

export default AppSwitchNavigator;