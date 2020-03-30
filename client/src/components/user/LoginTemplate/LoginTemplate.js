import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.scss';

const cx = classNames.bind(styles);

class LoginTemplate extends Component {

    
    render() {
        return (
            <div className={cx('entire')}>
                <div className={cx('login-template')}>
                    <form action="/api/login" method="post">
                    <div className={cx('header')}>
                        <h2>Login</h2>
                        <div className="button-group">
                                <input className={cx('log')} type="submit" value="Login" />
                                <Link className={cx('register')} to="/register">회원가입</Link>
                        </div>
                    </div>
                    <div className={cx('err')}>{this.props.error}</div> 
                    <div className={cx('content')}>
                        <div className="form-group">
                            <label>ID</label>
                            <input type="text"
                                    className="form-control"
                                    name="userId"
                                    placeholder=" test@google.com 입니다. "
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                    className="form-control"
                                    name="password"
                                    placeholder=" test123! 입니다. "
                            />
                        </div>
                    </div>
                    </form>
                </div>
                <div className={cx('description')}>
                    <h5> 본 프로젝트는 <span>[본점] / [각 매장지점장]</span>계정으로 각기 로그인합니다.</h5>
                    <div className={cx('content first')}>단, 프로젝트용(둘러보기) 편리함을 위해 하나의 계정으로 연동됩니다. </div>
                    <div className={cx('content second')}>
                        {/* <div>test 계정 </div> */}
                        <div>Test계정 [역삼점 지점장]: <span>test@google.com / test123!</span> </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginTemplate;