/**
 * Footer.tsx
 *
 * This component represents the footer of the application.
 * It displays a simple footer with some text content.
 */
import React from 'react';

import './Footer.scss'

/**
 * Footer component.
 *
 * This functional component renders the application's footer. It currently contains a
 * single line of text, but it can be expanded in the future to include more content
 * or functionality as required.
 */
const Footer: React.FC = () => {

    return (
        <footer>
            <h6>Brandon Paleczny - Gremlin - Frontend Take Home </h6>
        </footer>
    )
}

export default Footer;