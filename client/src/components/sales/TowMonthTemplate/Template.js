import React from 'react';
import classNames from 'classnames/bind';
import styles from './TowMonthTemplate.scss';

const cx = classNames.bind(styles);

const Template = (props) =>  {
    // 이 템플릿은 [전매장, 한매장] 두 경우 모두 사용합니다. 
    return (
        <div>
             <div className={cx('sales')}>
                <span>금월매출 : </span><span><b>{props.thisMonth}</b></span>
            </div>
            <div className={cx('sales')}>
                <span>전월매출 : </span><span><b>{props.lastMonth}</b></span>
            </div>
        </div>
    );
    
}

export default Template;