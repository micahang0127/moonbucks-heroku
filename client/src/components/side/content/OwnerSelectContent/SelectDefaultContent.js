import React  from 'react';

const SelectDefaultContent = (props) => {
        return (
            <div>
                  {/* 누적매출(전월,id매장) */}
               <div>{props.entireSales}</div>
                  {/* Drink순위 */}
               <div>{props.ProductsRankContainer}</div>
             </div>
        );
  
}

export default SelectDefaultContent;

