import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OwnerOption.scss';

const cx = classNames.bind(styles);

const OwnerSelectOption  =(props) => {
    
    return (
        <div className={cx('option')}>
            <div className={cx('header')}>
                <Link className={cx('actor-button')} to="/adminHome">본사(Admin) 입장 보러가기</Link>
                <br/><br/><b>[Owner]-[우리매장 통계]</b>
            </div>
            <select value={props.value} onChange={props.handleChange}>
                    <option value="choice">2020's  전체월</option>
                {
                    props.month.map((month, i) => 
                            <option key={i} value={month}>{month}</option>
                    )}
            </select>
        </div>
    );

}

export default OwnerSelectOption;