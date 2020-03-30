import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './Chart.scss';

const cx = classNames.bind(styles);




export default class TotalChart extends Component {

  render() {
    const tooltipStyle = {
      color: '#747474',
      fontSize: '15px' 
    };

    return (
      <div>
          <div className={cx('title-chart')}>2020's 총 매출</div>
           {/* 제목 : 총매출(월별) 현황   주석 : (만단위)  legend top여분 글씨체, 글씨크기 */}
            <BarChart
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
                    type="number" 
                    domain={[0, 1400000]}
                    tickLine={false}
                    fontSize={10}
                    ticks={[0, 200000, 400000, 600000, 800000, 1000000, 1200000, 1400000]}
              />
              <Tooltip 
                    itemStyle={tooltipStyle}
              />
              <Legend 
                    iconSize={10}
                    iconType='rect'
              />
              <Bar 
                    dataKey="price" 
                    name={"총매출(만단위)"}
                    fill="#F2CB61"
                    barSize={15}
                />
            </BarChart>
          </div>
        );
      }
    }



/*  실시간 test(jsfiddle.net)
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
*/