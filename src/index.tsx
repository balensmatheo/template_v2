import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/joy/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <React.StrictMode>
            <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <Routes>
                    <Route path="*" element={<App/>}/>
                </Routes>
            </StyledEngineProvider>
            </BrowserRouter>
        </React.StrictMode>
);
