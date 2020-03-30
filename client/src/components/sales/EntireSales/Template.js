import React from 'react';
import classNames from 'classnames/bind';
import styles from './EntireSales.scss';

const cx = classNames.bind(styles);

const Template = (props) =>  {
    // 이 템플릿은 [전매장, 한매장] 두 경우 모두 사용합니다. 
    return (
        <div className={cx('sales')}>
            <span>누적매출 : </span>
            <span>
                <b>{props.entireSales ? JSON.stringify(props.entireSales.sum) : ''}</b>
            </span>
        </div>
    );
    
}

export default Template;