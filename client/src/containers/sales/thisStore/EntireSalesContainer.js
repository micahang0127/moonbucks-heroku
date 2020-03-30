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

    // componentDidMount(){
    componentWillReceiveProps (){       // user props받으면 진입으로 변경
        // Owner Side Default

        // if(this.props.user){        // 미로그인 -> 요청X  ( => 로그인 후 redirect후 user props값이 새로 들어오지 않음. )
            axios.post('/api/totalSalesConstantStore')    //(  때문에, componentWillReceiveProps로 변경)
               .then(res => {
                   this.setState({
                       entireSales : res.data
                   });
               })
        // }
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