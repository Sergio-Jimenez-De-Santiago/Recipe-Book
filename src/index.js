import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename="/Recipe-Book">
        <AuthContextProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </AuthContextProvider>
    </BrowserRouter>,
);
