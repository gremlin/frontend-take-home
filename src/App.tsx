/**
 * App.tsx
 *
 * This is the root component of the application. It sets up the routing using
 * React Router and renders the main layout and pages of the application.
 */
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout.tsx'
import Search from './pages/Search.tsx';

/**
 * App component.
 *
 * This component uses React Router to define the application's routing structure.
 * It wraps the application in a BrowserRouter component for handling dynamic routing.
 * The Layout component is used to provide a consistent layout across different routes.
 * The Search component is rendered as the main page.
 */
function App(): React.JSX.Element {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Search />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
