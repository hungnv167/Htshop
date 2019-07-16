import axios from 'axios'
import urlDefault from '../../config'
const searchProduct = (key) =>{
    return axios.get(`${urlDefault}/list_product_with_criteria?name=${key}`)
}
export default searchProduct