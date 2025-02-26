import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<Home />} />
                <Route path='/login' element={<Home />} />
                <Route path='/register' element={<Home />} />
                <Route path='/blog' element={<Home />} />
                <Route path='/*' element={<Home />} />
            </Routes>
        </Router>
    );
}
