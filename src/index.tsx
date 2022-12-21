import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Metamask Dependency
import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

// const config: Config = {
//     readOnlyChainId: Mainnet.chainId,
//     readOnlyUrls: {
//         [Mainnet.chainId]: getDefaultProvider('mainnet'),
//         [Goerli.chainId]: getDefaultProvider('goerli'),
//     },
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <DAppProvider config={config}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  // </DAppProvider>
);

reportWebVitals();
