import React from 'react';
import {Outlet} from 'react-router-dom';

import Footer from '../Footer/Footer.tsx';
import Header from '../Header/Header.tsx';

import './Layout.scss'

const Layout: React.FC = () => {

    return (
        <div className="site-wrapper">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;