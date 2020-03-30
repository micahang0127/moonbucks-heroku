import React from 'react';
import classNames from 'classnames/bind';
import styles from './OwnerMain.scss';

const cx = classNames.bind(styles);


const OwnerMainTemplate = (props) => {
    return( 
        <div className={cx('main')}>
            {props.productsChart}   
            {props.totalChart}   
        </div>  
    );
};

export default OwnerMainTemplate;