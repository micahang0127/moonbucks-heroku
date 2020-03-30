import React from 'react';
import HeaderContainer from '../../../containers/common/HeaderContainer'
import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';
// import FooterTemplate from '../../common/Footer'


const cx = classNames.bind(styles);


const PageTemplate = ({children}) => {    // children

    return(
        <div className={cx('page-template')} >
            <header>
                <HeaderContainer/>
            </header>
            <main>
                {children}
            </main>
            {/* <footer>
                <FooterTemplate/>
            </footer> */}
        </div>
    );
};

export default PageTemplate;
