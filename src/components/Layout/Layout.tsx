/**
 * Layout.tsx
 *
 * This component serves as the primary layout structure for the application.
 * It wraps the application content with a header, main content area, and footer.
 */

import React from 'react';
import {Outlet} from 'react-router-dom';

import Footer from '../Footer/Footer.tsx';
import Header from '../Header/Header.tsx';

import './Layout.scss'

/**
 * Layout component.
 *
 * The Layout component is a higher-order component that wraps around the main content
 * of the application. It includes the Header at the top, the main content area in the
 * middle (populated by the current route's component), and the Footer at the bottom.
 *
 * The <Outlet> component is used to render the appropriate child routes content,
 * as defined in the application's route configuration.
 */
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