import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Metamask Dependency
import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

// TODO: (HAS BROKEN) FIX IT
// const config: Config = {
//     readOnlyChainId: Mainnet.chainId,
//     readOnlyUrls: {
//         [Mainnet.chainId]: getDefaultProvider('mainnet'),
//     },
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
