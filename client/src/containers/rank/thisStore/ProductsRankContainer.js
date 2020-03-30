import React, { Component } from 'react';
import { EntireTemplate } from '../../../components/rank/ProductRank';
import axios from 'axios'; 


 class ProductsRankContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            drink : [],
            food : [],
            goods : []
        }   
    }

    // componentDidMount(){
        componentWillReceiveProps(){

        // if(this.props.user){    // 미로그인 -> 요청X  ( => componentWillReceiveProps로 변경)
            axios.post('/api/drinkRankStoreConstant')
            .then(res => {
                this.setState({
                    drink : res.data
                });
            })
    
            axios.post('/api/foodRankStoreConstant')
            .then(res => {
                this.setState({
                    food : res.data
                });
            })
    
            axios.post('/api/goodsRankStoreConstant')
            .then(res => {
                this.setState({
                    goods : res.data
                });
            })
        // }

    }



    render() {
        return (
            <div>
                <EntireTemplate 
                        drink={this.state.drink}
                        food={this.state.food}
                        goods={this.state.goods} 
                /> 
            </div>
        );
    }
}

export default ProductsRankContainer;
