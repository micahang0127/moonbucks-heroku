import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectRequestActionOwner } from '../../../actions/select.action';
// Option
import SelectOption from '../../../components/side/option/ownerOption';
// Default 
import { SelectDefaultContent } from '../../../components/side/content/OwnerSelectContent'
import EntireSalesContainer from '../../sales/thisStore/EntireSalesContainer';
import ProductsRankContainer from '../../rank/thisStore/ProductsRankContainer'

// Select Chage
import { SelectContent } from '../../../components/side/content/OwnerSelectContent'


class OwnerSelectContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            month : ["1월","2월","3월","4월"],
            value : 'choice', 
        }
    }


    handleChange = (e) => {
        this.setState({
            value : e.target.value
        });
       
        this.props.handleContent(e.target.value);
    }

    render() {
        let templte = null;
        if(this.state.value==='choice'){
            templte =  <SelectDefaultContent
                            entireSales={<EntireSalesContainer
                                                        user={this.props.user}
                                          />} 
                            ProductsRankContainer={<ProductsRankContainer
                                                        user={this.props.user}
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
                    month={this.state.month}
                    value={this.state.value}
                    handleChange={this.handleChange}
                />
                {templte}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    // console.log('maptoprops'+JSON.stringify(state.adminSelected))
    return {
        content : state.selected.result,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleContent : (value) => dispatch(selectRequestActionOwner(value))
    };
}

OwnerSelectContainer = connect(mapStateToProps, mapDispatchToProps)(OwnerSelectContainer);


export default OwnerSelectContainer;