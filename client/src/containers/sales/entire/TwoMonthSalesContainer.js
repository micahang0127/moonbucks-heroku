import React, { Component } from 'react';
import axios from 'axios';
import  Template  from '../../../components/sales/TowMonthTemplate';

class TwoMonthSalescontainer extends Component {

    constructor(props){
        super(props);
        this.state={
            thisMonth : [],
            lastMonth : []
        }
    }

    componentDidMount(){
        // Admin Side Default
        axios.post('/api/salesSelect')
        .then(res => {
            this.setState({
                thisMonth : res.data[0].total_sales, 
                lastMonth : res.data[1].total_sales
            });
        }) 
    }


    render() {
        return (
            <div>
                <Template
                    thisMonth={JSON.stringify(this.state.thisMonth)}
                    lastMonth={JSON.stringify(this.state.lastMonth)}
                />
            </div>
        );
    }
}

export default TwoMonthSalescontainer;