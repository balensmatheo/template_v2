import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/joy/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <React.StrictMode>
            <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <App/>
            </StyledEngineProvider>
            </BrowserRouter>
        </React.StrictMode>
);
