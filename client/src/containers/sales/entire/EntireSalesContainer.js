import React, { Component } from 'react';
import axios from 'axios';
import Template from '../../../components/sales/EntireSales';

class EntireSalesContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            entireSales : []
        }
    }

    componentDidMount(){
        // Admin Side Default
         axios.post('/api/totalSales')
            .then(res => {
                this.setState({
                    entireSales : res.data
                });
            })
    }


    render() {
        return (
            <div>
                <Template
                    entireSales={this.state.entireSales[0]}
                />
            </div>
        );
    }
}

export default EntireSalesContainer;