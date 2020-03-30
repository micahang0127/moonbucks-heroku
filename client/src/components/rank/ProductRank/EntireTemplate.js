import React from 'react';
import classNames from 'classnames/bind';
import styles from './EntireTemplate.scss';

const cx = classNames.bind(styles);

const EntireTemplate = (props) => {

    return(   // owner side default
        <div>
            <div className={cx('title')} >2020's Rank</div>
                 {/* Drink순위  */}
            <div className={cx('category-rank')}> 
                 <h4>Drink</h4>
                  <ol>
                      <li>  
                            <span>{props.drink[0] ? JSON.stringify(props.drink[0].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.drink[0] ? JSON.stringify(props.drink[0].price) : '' })</span>
                      </li>
                      <li>  
                            <span>{props.drink[1] ? JSON.stringify(props.drink[1].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.drink[1] ? JSON.stringify(props.drink[1].price) : '' })</span>
                      </li>
                      <li> 
                            <span>{props.drink[2] ? JSON.stringify(props.drink[2].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.drink[2] ? JSON.stringify(props.drink[2].price) : '' })</span> 
                      </li>
                  </ol>
            </div>
                  {/* Food순위 */}
            <div className={cx('category-rank')}> 
                  <h4>Food</h4>
                  <ol>
                      <li>  
                            <span>{props.food[0] ? JSON.stringify(props.food[0].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.food[0] ? JSON.stringify(props.food[0].price) : '' })</span>
                      </li>
                      <li>  
                            <span>{props.food[1] ? JSON.stringify(props.food[1].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.food[1] ? JSON.stringify(props.food[1].price) : '' })</span>
                      </li>
                      <li> 
                            <span>{props.food[2] ? JSON.stringify(props.food[2].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.food[2] ? JSON.stringify(props.food[2].price) : '' })</span> 
                      </li>
                  </ol>
            </div>
                  {/* Goods순위 */}
            <div className={cx('category-rank')}>
                  <h4>Goods</h4>
                  <ol>
                       <li>  
                            <span>{props.goods[0] ? JSON.stringify(props.goods[0].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.goods[0] ? JSON.stringify(props.goods[0].price) : '' })</span>
                      </li>
                      <li>  
                            <span>{props.goods[1] ? JSON.stringify(props.goods[1].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.goods[1] ? JSON.stringify(props.goods[1].price) : '' })</span>
                      </li>
                      <li> 
                            <span>{props.goods[2] ? JSON.stringify(props.goods[2].name).replace(/"/gi, "") : '' }</span>
                            <span>({props.goods[2] ? JSON.stringify(props.goods[2].price) : '' })</span> 
                      </li>
                  </ol>
            </div>
          </div>
      );
    };

export default EntireTemplate;

