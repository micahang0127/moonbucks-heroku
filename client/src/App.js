import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFoundPage, RegisterPage, AdminHomePage, OwnerHomePage} from './pages';
import './styles/base.scss';
// yarn eject는 함부로 사용하지 말것. -> (주의)한번 사용하면 되돌릴 수 없다!!
// 현재상황 :
// yarn eject -> git discard (eject를 되돌리려 eject로 변화된 파일 되돌림) -> 문제발생!! client서버가 작동하지 않음
// 해결 : 
// -> github에서 clone으로 다시 파일 생성 -> git commit까지 잘 되는지 test중 -> 성공.

class App extends Component {

  
  render(){
    return (

      <div> 
        <main> 
          <Router>
            <Switch>
              <Route path="/register" component={ RegisterPage }/>
              <Route path="/adminHome" component={ AdminHomePage}/>
              <Route path="/ownerHome" component={ OwnerHomePage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </Router>
        </main>
      </div>
    );
   }
}

export default App;
