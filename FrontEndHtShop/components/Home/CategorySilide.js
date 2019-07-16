import React, { Component } from 'react'
import { Text, View , StyleSheet, Dimensions, Image,TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import urlDefault from '../../config'
const {height, width} = Dimensions.get("window")

export default class CategorySilide extends Component {
    constructor(props){
        super(props)
        this.state = {
            typeProduct: []
        }   
    }
    componentDidMount() {
        axios.get(`${urlDefault}/list_all_typeproduct`)
            .then( res => {
                this.setState({
                    typeProduct: res.data.data
                })
            })
            .catch(err =>{
                console.error(err)
            })
    }
    showSlideType = () => {
        return this.state.typeProduct.map(slide =>(
                    <TouchableOpacity key={slide._id}  onPress={() => this.props.navigation.navigate('ProductList') }>
                        <Image style={styles.ImageSlide} 
                        source={{uri: slide.typeProductImage}}/>
                    </TouchableOpacity>   
        ))
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{flex: 1}}>
                    <Text style={styles.styleText}>LIST OF CATEGORY</Text>
                </View>
                <View style={{flex: 4}}>
                    <Swiper>
                        {this.showSlideType()}
                    </Swiper>
                </View>
            </View>
        )
    }
}
const widthImage = width - 40
const heightImage = widthImage/2
const styles =  StyleSheet.create({
    wrapper:{
        height: height*0.3,
        margin: 10,
        backgroundColor: "#FFFFFF",
        padding: 10,
        shadowColor: "#2E272B",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2
    },
    ImageSlide:{
        width: widthImage,
        height: heightImage
    },
    styleText:{
        fontSize: 20,
        color: "#AFAEAF",
        fontFamily: "Avenir",
    },
})
