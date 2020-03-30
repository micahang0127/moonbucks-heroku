import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectRequestActionAdmin  } from '../../../actions/select.action';
import { radioRequestAction  } from '../../../actions/radio.action';
// Option
import SelectOption from '../../../components/side/option/AdminOption';
// Default
import { SelectDefaultContent } from '../../../components/side/content/AdminSelectContent'; // 해당폴더에 여러 파일 있을 경우 { }중괄호에 넣어준다.
import TwoMonthSalesContainer from '../../sales/entire/TwoMonthSalesContainer';
import EntireSalesContainer from '../../sales/entire/EntireSalesContainer';
import StoreRankContainer from '../../rank/entire/store/StoreRankContainer';
import { OneTemplate }from '../../../components/rank/ProductRank';
// Select Chage
import { SelectContent } from '../../../components/side/content/AdminSelectContent'


class AdminSelectContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            stores : [],
            value : 'choice', 
            sales : [],
            storesRank : [],
            checkedOption : 'Drink',
        }
    }


    componentDidMount(){
        // [admin]
        axios.post('/api/storesName')
            .then(res => {      //  [{"name":"test역삼DT점"},{"name":"test종로"},{"name":"test삼성"}]
                for(let i=0; i < res.data.length; i++){
                    this.setState({
                        stores: this.state.stores.concat(res.data[i].name)
                    });
                }
                })
                .catch(err => {
                    console.log(err);
                })

                this.props.handleRadioContent(this.state.checkedOption)
    }  

   

    // [select Option Change ]
    handleChange = (e) => {
        this.setState({
            value : e.target.value
        });
        this.props.handleContent(e.target.value);
    }

    //  [ category radio btn ]
    handleRadio = (e) => {
        this.props.handleRadioContent(e.target.value)

        this.setState({
            checkedOption : e.target.value
        });
    }



    render() {
        let templte = null;
        if(this.state.value ==='choice'){
            templte =  <SelectDefaultContent
                            towSales={<TwoMonthSalesContainer/>}
                            entireSales={<EntireSalesContainer/>}
                            storeRankContainer={<StoreRankContainer/>}
                            handleRadio={this.handleRadio}
                            checkedOption={this.state.checkedOption}
                            productsRankContainer={<OneTemplate
                                                      radiocontent={this.props.radiocontent}
                                                   />}
                             />
        }else{
            templte =  <SelectContent
                             storeData={this.props.content ? this.props.content : ''}
                        />
        }

        return (
            <div>
                <SelectOption 
                    stores={this.state.stores}
                    value={this.state.value}
                    handleChange={this.handleChange}
                />
               {templte}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        content : state.selected.result,  // reducer(index.js)에서 지정한 네임
        radiocontent : state.adminRadio.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleContent : (value) => dispatch(selectRequestActionAdmin(value)),
        handleRadioContent : (value) => dispatch(radioRequestAction(value))
    };
}

AdminSelectContainer = connect(mapStateToProps, mapDispatchToProps)(AdminSelectContainer);


export default AdminSelectContainer;