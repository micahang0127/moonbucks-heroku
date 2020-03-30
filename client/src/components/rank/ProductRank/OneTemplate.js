import React from 'react';
//css

const OneTemplate = (props) => {

    return(   // admin side defualt ridioButton
        <div>
              <ol>
                 <li><span>{props.radiocontent ? JSON.stringify(props.radiocontent[0].name).replace(/"/gi, "") : ''}</span>
                     <span>({props.radiocontent ? JSON.stringify(props.radiocontent[0].price) : ''})</span>
                </li>
                 <li><span>{props.radiocontent ? JSON.stringify(props.radiocontent[1].name).replace(/"/gi, "") : ''}</span>
                     <span>({props.radiocontent ? JSON.stringify(props.radiocontent[1].price) : ''})</span>
                </li>
                 <li><span>{props.radiocontent ? JSON.stringify(props.radiocontent[2].name).replace(/"/gi, "") : ''}</span>
                     <span>({props.radiocontent ? JSON.stringify(props.radiocontent[2].price) : ''})</span>
                </li>
              </ol>
              </div>
              );
            };

export default OneTemplate;

