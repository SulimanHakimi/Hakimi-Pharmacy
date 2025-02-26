import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import About from './pages/About';
import Header from './components/header';
import Footer from './components/footer';


export default function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Home />} />
                <Route path='/blog' element={<Home />} />
                <Route path='/blog/post/:id' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path="/category/:categoryName" component={""} />
                <Route path='/*' element={<Home />} />
            </Routes>
            <Footer/>
        </Router>
    );
}
