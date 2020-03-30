import React from 'react';
import classNames from 'classnames/bind';
import styles from './StoreRank.scss';

const cx = classNames.bind(styles);

const Template = (props) =>  {
    return (
        <div className={cx('store-rank')}>    
          <h3 className={cx('title')}> ※ 매장 순위</h3> 
          <ol>
            <li>{props.first}</li>
            <li>{props.second}</li>
            <li>{props.third}</li>
          </ol>      
        </div>
    );
}

export default Template;