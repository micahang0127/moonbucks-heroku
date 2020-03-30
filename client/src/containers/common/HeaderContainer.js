import React, { Component } from 'react';
import axios from 'axios';
import HeaderTemplate from '../../components/common/Header';
import { withRouter} from 'react-router-dom';


class HeaderContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            owner : '',
            storeName : '',
            flash : '' 
        };
    }


    componentDidMount(){
        axios.post('/api/user') 
             .then(res => {
                 this.setState({
                     owner : res.data.name, 
                     storeName : res.data.storeName
                 })
             })  
             .catch(err => console.log(err));


         axios.get('api/loginError')
             .then(res => res.data)  
             .then(result => {
                 this.setState({ flash : result})       //  { "error" : "에러 메세지 내용"}
                })
    }


     clickLogout = () => {
         axios.get('/api/logout')
                .then(res => {
                    if(res.data.succ){
                        this.setState({
                            owner : false
                        })
                        this.props.history.push('/adminHome');
                    }
                })
     }

    

    render() {
        
   
        return ( 
                <HeaderTemplate
                    storeName={this.state.storeName}
                    clickLoginEvn={this.clickLoginEvn}
                    clickLogin={this.state.clickLogin}
                    clickLogout={this.clickLogout}
                    // login
                    owner={this.state.owner}
                    error={this.state.flash.error}
                />
        );
    }
}

export default withRouter(HeaderContainer);
/*
-> client 부분 method로 redirect 하기

[ withRouter - this.props.history.push('/url') ]
하위 컴포넌트의 경우에는 history를 접근할 수 없어 상위 컴포넌트의 Router의 history 객체와 연결시켜준다
참고: http://kimch3617.tistory.com/entry/React-Router-v4-리다이렉트-하기 [코드 저장소]
*/