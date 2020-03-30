import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.scss';

const cx = classNames.bind(styles);

class RegisterTemplate extends Component{


  

    

    render(){
        const { ownername,  email, password, password2,  phone,  selectedValue, selectedStore, 
                 nameError, emailError1, emailError2, pw1Error, pw2Error, phoneError,
                 CheckEmail, CheckPw, CheckPw2, CheckPhone, handleSubmit,
                 handleChangeStore, handleChangeOwner, handleChangeId, handleChangePw , handleChangePw2, handleChangeOwnerPhone
            } = this.props;

            
            
        return(
            <div className={cx('register-container')}>
                <h2 className={cx('title')}>Register</h2>
                <form name="form" >
                    <div className={cx('form-group')}>
                        <span className={cx('required')}>*</span>
                        <label>매장명</label>
                          <select className={cx('form-control select')} value={selectedValue} onChange={handleChangeStore}>
                              <option disabled="disabled" value='default'>매장선택</option>
                                { 
                                 this.props.storeOption.map((store) => 
                                      <option key={store.storeId}>{store.name}</option>
                                )}
                            </select>
                    </div>
                    <div className={cx('description')}>* 매장당 한명의 owner만 가입할 수 있습니다.
                          (즉, owner가 지정되지 않은 매장들만 목록으로 나타납니다.)
                    </div>
                     {/* 매장명을 select하면 -> 매장 주소, 매장 번호가 뜬다.   */}
                   <div className={cx('form-group flex')}>
                        <label>매장 주소</label>
                        <div className={cx('form-control text store-name')} name="store-name">
                                {selectedStore.address ? JSON.stringify(selectedStore.address).replace(/"/gi, "") : ''}
                        </div>
                    </div> 
                     <div className={cx('form-group flex')}>
                        <label>매장 전화번호</label>
                        <div className={cx('form-control text store-phone')} name="store-phone">
                                {selectedStore.phone ? JSON.stringify(selectedStore.phone).replace(/"/gi, "") : ''} 
                        </div>
                    </div> 
                    {/*  참고, 주의) input text에 입력을 못하게 하는 방법 [readOnly / disabled]가 있다.
                        disabled 는 폼으로 값이 전송이 안된다. 폼으로 데이터를 전송하고 싶으면 반드시 readonly 를 써야한다 
                    */}
                    <div className={cx('form-group')}>
                         <span className={cx('required')}>*</span>
                        <label>대표자명</label>&nbsp;&nbsp;
                        <input type="text" className={cx('form-control text i username')}  name="ownername"
                                value={ownername} required onChange={handleChangeOwner}/>
                        <div>
                        { nameError ? <div className={cx('err')}>{nameError}</div> : '' }
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('required')}>*</span>
                        <label>Email(ID)</label>&nbsp;&nbsp;
                        <input type="text" className={cx('form-control text i email')} name="email"
                                value={email} required onChange={handleChangeId} onBlur={CheckEmail}/>
                          <div> 
                          { emailError1 ? <div className={cx('err')}>{emailError1}</div> : '' }
                          { emailError2 ? <div className={cx('err')}>{emailError2}</div> : '' }
                        </div>
                        
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('required')}>*</span>
                        <label>Password</label>&nbsp;&nbsp;
                        <input type="text" className={cx('form-control text i password')} name="password"
                                value={password} required  onChange={handleChangePw} onBlur={CheckPw}
                                placeholder="특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내"
                                />
                        <div>
                           { pw1Error ? <div className={cx('err')}>{pw1Error}</div> : '' }
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <span className={cx('required')}>*</span>
                        <label>Password확인</label>
                        <input type="text" className={cx('form-control text i password2')} name="password2"
                                 value={password2} required onChange={handleChangePw2} onBlur={CheckPw2}
                                 placeholder="비밀번호를 다시 입력해 주세요"/>
                        <div>
                           { pw2Error ? <div className={cx('err')}>{pw2Error}</div> : '' }
                        </div>
                    </div>
                    <div className={cx('form-group phone')}>
                        <label>대표자 전화번호</label>
                        <input type="text" className={cx('form-control text i phone')} name="phone"
                                value={phone} onChange={handleChangeOwnerPhone} onBlur={CheckPhone}
                                placeholder="010-xxxx-xxxx"
                                />
                         <div>
                            { phoneError ? <div className={cx('err')}>{phoneError}</div> : '' }
                         </div>
                    </div>
                    <div className={cx('form-group btn')}>
                        <button  onClick={handleSubmit} className={cx('btn submit')}>Register</button>
                        <Link to="/adminHome" className={cx('btn cancle')}>Cancle</Link>
                        {/* <button type="submit" onSubmit={handleSubmit} className="btn btn-primary">Register</button> */}
                        {/* <button className="btn btn-link">Cancle</button> */}
                    </div>
                </form>
            </div>

        );
    }
}





export default  RegisterTemplate;