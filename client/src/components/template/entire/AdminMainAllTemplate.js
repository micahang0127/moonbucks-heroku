import React, { Component } from 'react';
import axios from 'axios';
import SideContainer from '../../../containers/select/entire/AdminSelectContainer';
import Map from '../../map';
import classNames from 'classnames/bind';
import styles from './entire.scss';

const cx = classNames.bind(styles);

class AdminMainAllTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            blur : 'entire default'
        }
    }

    componentDidMount(){
        axios.post('/api/user') 
        .then(res => {
            if(res.data.email){
                this.setState({
                    blur : 'entire user'
                })
            }
        })  
        .catch(err => console.log(err));
    }


    render(){
        
        return (
            <div className={cx(this.state.blur)}>
             {/* <div className={cx('entire')}>  */}
                <article>
                    <SideContainer/>
                </article> 
                <main>
                     <Map/>
                </main>
            </div>
        );
    }
}

export default AdminMainAllTemplate;

