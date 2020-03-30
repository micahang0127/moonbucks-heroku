import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminOption.scss';

const cx = classNames.bind(styles);

const AdminSelectOption = (props) =>  {
    // 선택 값 -> action -> reducer(선택값) -> saga -> api -> [sideContent]dispatch(결과값)

     return (
        <div className={cx('option')}>
            <div className={cx('header')}>
                <Link className={cx('actor-button')} to="/ownerHome" >매장주(역삼점) 입장 보러가기</Link>
                <br/><br/><b>[Admin]-[전체지점 통계]</b>
            </div>
           <select value={props.value} onChange={props.handleChange}>
                <option value="choice">전체매장</option>
               {
                   props.stores.map((store, i) => 
                        <option key={i} value={store}>{store}</option>
                )}
           </select>
        </div>
        
    );
}

export default AdminSelectOption;