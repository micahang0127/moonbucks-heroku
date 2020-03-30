import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './Chart.scss';

const cx = classNames.bind(styles);

export default class ProductsChart extends Component {


    /*
    LinkChart : chart전체
    CartesianGrid : 차트 바탕 안내선
                    storkeDasharray : 숫자가 작을 수록 점선이 촘촘해 진다
    Tooltip : 해당 지점에 마우스를 가져다 대면 나오는 popup 내용
    Legend : 아래 나오는 설명
    Line : 하나의 라인 
           activeDot={{ r: 5}} 속성값에 이것을 주면, 해당 라인에 마우스를 가져다 대었을 때 점크기가 숫자만큼 커진다 .
    */



  render() {
    const tooltipStyle = {
        fontSize:'15px',
        width: '100px',
        textAlign: 'center'
    }

    return (
      <div>
          <div className={cx('title-chart')}>2020's category별 총매출</div>
             {/* 제목 : <Product> 월별 매출 현황   주석 : (만단위)  legend top여분 글씨체, 글씨크기 */}
          <LineChart
                    width={800}
                    height={400}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="month" 
                  tickLine={false}     // x축 표시로 튀어나오는 선 false
                  tickMargin={10}       // x축 선과 문자열 사이의 공간
                  fontSize={12}        // x축 문자열 크기
            />
            <YAxis 
                    // dataKey="y"
                    type="number" 
                    domain={[0, 400000]}
                    tickLine={false}
                    fontSize={10}
                    ticks={[0, 100000, 200000, 300000, 400000]}
            />
            <Tooltip 
                    itemStyle={tooltipStyle}
            />
            <Legend 
                    iconSize={10}
                    iconType='rect'
                    // margin={{ top: 30, left: 30, right: 30, bottom: 30 }}
                    // content={LegendChart}
                    
            />     
            <Line 
                    type="monotone"
                    dataKey="drink" 
                    stroke="#756600" 
                    dot={false} 
                    // name={"drink"}
            />
            <Line type="monotone" dataKey="food" stroke="#6799FF" dot={false} />
            <Line type="monotone" dataKey="goods" stroke="#F361A6" dot={false}/>
          </LineChart>
      </div>
    );
  }
}


/*  실시간 test(jsfiddle.net)
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/'; 
*/