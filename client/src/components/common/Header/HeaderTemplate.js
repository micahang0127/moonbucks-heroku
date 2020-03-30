import React from 'react';
import LoginPage from '../../user/LoginTemplate';
import classNames from 'classnames/bind';
import styles from './Header.scss';

const cx = classNames.bind(styles);

const HeaderTemplate = (props) => {
    return(
        <div className={cx('header-template')} >
            <div className={cx('header-bar')}>
                { props.owner ? 
                        <div className={cx('text')}>
                            <b><span className={cx('store-name')}>{props.storeName}</span>점. </b>
                            <span><b>{props.owner}</b></span><span>점주님, 반갑습니다. </span> 
                            <button className={cx('button log')} onClick={props.clickLogout}>Logout</button>
                        </div>
                        : <div></div>
                }
                <div>
                    <span className={cx('text none')}>클릭해 주셔서 감사합니다. </span>
                    <a href="#"><button className={cx('button side')}>NOTION 포트폴리오 보러가기</button></a>
                    <a href="#"><button className={cx('button side')}>github</button></a>
                </div>
            </div>
                {
                props.owner ? <div></div> :
                <div className={cx('header-login')}>
                    <LoginPage 
                        error={props.error}
                    />
                </div>
                }
        </div>
       

    );
};

export default HeaderTemplate;