import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Metamask Dependency
import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: "https://mainnet.infura.io/v3/978151aee2714956959a6a3c56acd099",
    },
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </React.StrictMode>
);

reportWebVitals();
