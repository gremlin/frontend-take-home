import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout.tsx'
import Search from './pages/Search.tsx';

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
