import React  from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultContent.scss';

const cx = classNames.bind(styles);

const SelectDefaultContent = (props) => {
        return (
                <div>
                     {/* 금월,전월,누적 매출(전매장) */}
                     <div className={cx('sales')}>
                        <div>{props.towSales}</div>
                        <div>{props.entireSales}</div>
                     </div>
                     {/* 카테고리 radio btn(전매장) */}
                     <div className={cx('radio-container')}>
                        <div id="category" className={cx('category')}>
                           <label>                             {/* state객체사용시 checked={this.state.radioGroup['Drink']}    */}
                              <input type="radio" value="Drink" checked={props.checkedOption==='Drink'}
                                                               onChange={props.handleRadio}/>
                              Drink</label>
                           <label>
                              <input type="radio" value="Food" checked={props.checkedOption==='Food'}
                                                               onChange={props.handleRadio}/>
                              Food</label>
                           <label>
                              <input type="radio" value="Goods" checked={props.checkedOption==='Goods'}
                                                               onChange={props.handleRadio}/>
                              Goods</label>
                        </div> 
                        <div>{props.productsRankContainer}</div>
                     </div>
                     {/* 매장순위 */}
                     <div id="stores_rank" className={cx('stores-rank')}>
                        <div>{props.storeRankContainer}</div>   
                     </div>
                </div>
        );
  
}

export default SelectDefaultContent;

