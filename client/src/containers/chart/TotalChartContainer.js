import React, { Component } from 'react';
import TotalChart from '../../components/chart/TotalChart';
import axios from 'axios';


class TotalChartContainer extends Component {

    constructor(props){
        super(props);
        this.state ={
            data : []
        }
    }

    // componentWillMount(){
    componentWillReceiveProps(){
        // if(this.props.user){  // 미로그인 시 데이터 요청X  (  => componentWillReceiveProps로 변경)
            axios.post('/api/totalSalesYearStore')
                    .then(res => {
                        this.setState({
                            data : res.data
                        })
                    })
        // } // end if
    }

    render() {
        return (
            <div>
                <TotalChart
                        data={this.state.data}
                />
            </div>
        );
    }
}

export default TotalChartContainer;


// Test data 
/*
const data = [
  {
    name: '1월', uv: 400
  },
  {
    name: '2월', uv: 300
  },
  {
    name: '3월', uv: 200
  },
  {
    name: '4월', uv: 270
  },
  {
    name: '5월', uv: 180
  },
  {
    name: '6월', uv: 290
  },
  {
    name: '7월', uv: 390
  },
  {
    name: '8월', uv: 390
  },
  {
    name: '9월', uv: 390
  },
  {
    name: '10월', uv: 340
  },
  {
    name: '11월', uv: 340
  },
  {
    name: '12월', uv: 340
  },
];
*/