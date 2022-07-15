import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/joy/styles';
import {BrowserRouter} from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
);
