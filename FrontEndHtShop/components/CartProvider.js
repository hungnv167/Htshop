import React, { Component } from 'react'
import Search from '../components/search/SearchApi'
export const CartContext = React.createContext()
export class CartProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            cartItem: [],
            arrSearch: []
        }
    }
    addToCart = async (product) => {
        try{
            alert(`ADD ${product.name}`)
            if(this.state.cartItem.find((it => it.product._id === `${product._id}`))=== undefined){
                await this.setState({
                    cartItem: this.state.cartItem.concat({product,count: 1})
                })
            }else{
                await this.setState({
                    cartItem: this.state.cartItem.map( item =>item.product._id === `${product._id}` ? {...item, count: item.count+ 1}: item)
                })
            }
        }
        catch(error){
            console.log(error)
        }
    }
    removeItem = async (product) => {
        try{
            if(product.count === 1){
                await this.setState({
                    cartItem: this.state.cartItem.filter(item => item.product._id !== `${product.product._id}`)
                })
            }
            else{
                await this.setState({
                    cartItem: this.state.cartItem.map( item =>item.product._id === `${product.product._id}` ? {...item, count: item.count - 1}: item)
                })
            }
        }
        catch(error){
            console.log(error)
        }
    }
    addToCartInScreen = async (product)  =>{
        try{
            await this.setState({
                cartItem: this.state.cartItem.map( item =>item.product._id === `${product.product._id}` ? {...item, count: item.count + 1}: item)
            })
        }
        catch(error){
            console.log(error)
        }
    }
    getTotal =  () => {
            var total = this.state.cartItem.reduce((priceA,priceB) =>{
                return priceA + priceB.product.price*priceB.count
            },0)
            return total
    }
    deleteItem = async (product) => {
        try{
            await this.setState({
                cartItem: this.state.cartItem.filter(item => item.product._id !== `${product.product._id}`)
            })
        }
        catch(error){
            console.log(error)
        }
    }
    searchItem = (text) =>{
        Search(text)
            .then(res =>{
                this.setState({
                    arrSearch: res.data.data
                })
            })
            .catch(err=>console.log(err))
    }
    checkOut = () =>{
        this.setState({
            cartItem: []
        })
    }
    render() {
        return(
            <CartContext.Provider value={{
                cartItem: this.state.cartItem,
                addToCart: this.addToCart,
                removeItem: this.removeItem,
                addToCartInScreen: this.addToCartInScreen,
                getTotal: this.getTotal,
                deleteItem: this.deleteItem,
                searchItem: this.searchItem,
                arrSearch: this.state.arrSearch,
                checkOut : this.checkOut
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}