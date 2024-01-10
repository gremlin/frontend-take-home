/**
 * Spinner.tsx
 *
 * This component is a visual indicator for loading processes. It displays a spinner
 * animation typically used when waiting for data to be fetched or during other
 * asynchronous operations.
 */

import React from 'react';

import './Spinner.scss';

/**
 * Spinner component.
 *
 * A functional component that renders a spinner using CSS animations. It can be used
 * throughout the application to indicate that a background process is ongoing and the
 * user should wait.
 */
const Spinner: React.FC = () => {
    return (
        <div data-testid="loading-spinner" className="spinner__container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
