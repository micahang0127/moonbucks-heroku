import React, { Component } from 'react';
import RegisterTemplate  from '../../components/user/RegisterTemplate/RegisterTemplate';
import axios  from 'axios';
import { withRouter} from 'react-router-dom';


class RegisterContainer extends Component {
  
    constructor(props){
        super(props);
        this.state ={
            ownername : undefined,
            storeOption: [],             // 매장명들(select options)
            selectedValue: 'default',    // select 초기값 지정(option중 value='default'인것이 초기값)
            selectedStore : '',          // 선택한 매장 가져온 정보
            email:'',
            password:'',
            password2:'',
            phone:'',
            existSucc : '',
            nameError : false,
            emailError1 : false,
            emailError2: false,
            pw1Error: false,
            pw2Error: false,
            phoneError: false,

        }
    }

    componentDidMount(){

        axios.post('/api/store')        // (주의) 서버에서 꼭!! res.send로 보내야함 (res.json은 {"~","~"}세부내용이 jsx에서 추출이 안된다.)
        .then(res => res.data)
        .then(result => {
            this.setState({
                storeOption : result       
            })
        })
        .catch(err => console.error(err))
        /* const storeData = [
            {   "storeId": 1, "name": "test역삼DT점"  },
            {   "storeId": 2, "name": "test종로"     },
            {   "storeId": 3, "name": "test삼성"    }
            ] 
        */
    }


    handleSubmit = (e) => { 
        e.preventDefault();
        const { CheckName, CheckEmail, CheckPw, CheckPw2, CheckPhone} = this;
        let val = e.target.value;

        if( CheckName(val) && CheckEmail(val)  && CheckPw(val) && CheckPw2(val) && CheckPhone(val) && this.state.selectedValue !=='default'){
            axios.post('/api/register', { 
                "storeId" : this.state.selectedStore.storeId, 
                "email" :  this.state.email,
                "username" :  this.state.ownername, 
                "password" :  this.state.password, 
                "phone" : this.state.phone
            })
                .then(res => {
                    if(res.data.succ){
                       this.props.history.push('/adminHome')
                    }
                })     
        }else{
            if(this.state.selectedValue==='default'){
                alert('매장을 선택해 주세요')
            }
            console.log('false Submit');
        }
    }

    // 매장 select -> axios로 매장 값들 가져온다. -> 선택 값으로 storename 저장
    handleChangeStore = (e) => {
        this.setState({
            selectedValue : e.target.value  // 선택한 매장 보이기 유지
        })
        this.getStore(e.target.value);
    }

    getStore = (name)=> {   // selected한 매장 정보
        axios.post('/api/seletedStore', {"name": name})
            .then(res => {
                this.setState({
                    selectedStore : res.data[0]
                })
        })

    }

    CheckName = (e) => {
        if(this.state.ownername===undefined){
            this.setState({
                nameError : '대표자명을 입력해주세요' 
            })
            return false;
        }
        else{
            return true;
        }
    }


    CheckEmail = (e) => {

         // 이메일 유효성 검사
         const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
         const check =  regExp.test(this.state.email) ? true : false; 
         if(!check){
             this.setState({
                 emailError1 : '이메일 형식이 아닙니다.'
             })
            //  this.inputRef.current.focus();  => 작동은 되나, 다른칸으로 넘어갈수 없고, alert 2번 뜸.
             return false 
         }
         else{

            axios.post('/api/existEmail', {"email" : this.state.email})
            .then(res => {
                // {succ : true , massage : "가능"} or {succ :false , massage : "이미 존재하는 아이디입니다."}
                this.setState({
                    existSucc : res.data.succ
                })
                if(!res.data.succ){
                    this.setState({
                        emailError2 : res.data.massage
                    })
                }
            })
            this.setState({
                emailError1 : '',
                emailError2 : ''
            })
            return this.state.existSucc;
            // return true
         }  // end else
    }


    CheckPw = () => {
        // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
        const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        const check =  regExp.test(this.state.password) ? true : false; 
         if(!check){
             this.setState({
                 pw1Error : '비밀번호 형식이 맞지않습니다.'
             })
            //  this.focus();
             return false 
         }else{
             this.setState({
                 pw1Error : ''
             })
             return true
         }
    }
    CheckPw2 = () => {      
        if(this.state.password !== this.state.password2){
            this.setState({
                pw2Error : '비밀번호가 일치하지 않습니다.'
            })
            // this.focus();
            return false;
        }else{
            this.setState({
                pw2Error : ''
            })
            return true;
        }
    }
    CheckPhone = () => {     
        // 핸드폰번호 정규식
        const regExp = /^\d{3}-\d{3,4}-\d{4}$/;
        const check =  regExp.test(this.state.phone) ? true : false; 
         if(!check){
             this.setState({
                 phoneError : '전화번호 형식이 맞지 않습니다.'
             })
            //  this.focus();
             return false 
         }else{
             this.setState({
                 phoneError : ''
             })
             return true
         }
    }

    handleChangeOwner = (e) => {
        this.setState({
            ownername : e.target.value
        });
    }

    handleChangeId = (e) => {
        this.setState({
            email : e.target.value
        });
    }

    handleChangePw = (e) => {
        this.setState({
            password : e.target.value
        });
    }
    
    handleChangePw2 = (e) => {
        this.setState({
            password2 : e.target.value
        });
    }

    handleChangeOwnerPhone = (e) => {
        this.setState({
            phone : e.target.value
        });
    }


    render() {
        
        

        return (
            <RegisterTemplate
                // data
                ownername={this.state.ownername}
                storeOption={this.state.storeOption}
                selectedValue={this.state.selectedValue}    // 선택한 매장
                selectedStore={this.state.selectedStore}      // 선택한 매장의 정보
                email={this.state.email}
                password={this.state.password}
                password2={this.state.password2}
                phone={this.state.phone}
                // Error
                nameError={this.state.nameError}
                emailError1={this.state.emailError1}
                emailError2={this.state.emailError2}
                pw1Error={this.state.pw1Error}
                pw2Error={this.state.pw2Error}
                phoneError={this.state.phoneError}
                // handler
                handleSubmit={this.handleSubmit}
                handleChangeStore={this.handleChangeStore}
                handleChangeOwner={this.handleChangeOwner}
                handleChangeId={this.handleChangeId}
                handleChangePw={this.handleChangePw}
                handleChangePw2={this.handleChangePw2}
                handleChangeOwnerPhone={this.handleChangeOwnerPhone}
                // check blur - focus를 잃으면 이벤트 발생 (ch.focusout은 포커스를 잃은 모든 input-text에서 이벤트가 발생한다.)
                CheckEmail={this.CheckEmail}
                CheckPw={this.CheckPw}
                CheckPw2={this.CheckPw2}
                CheckPhone={this.CheckPhone}
            />
        );
    }
}

export default withRouter(RegisterContainer);


/*
Hook 변경 참조
https://dog-developers.tistory.com/109
*/
