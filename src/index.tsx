import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Metamask Dependency
import { Mainnet, DAppProvider, Config } from '@usedapp/core'

// React Router Dom Dependency
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DetailCustomer from "./components/DetailCustomer/DetailCustomer";
import {env} from "./environments/environments";

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: env.mainnet
    },
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/detail/:id",
        element: <DetailCustomer />
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <RouterProvider router={router} />
        </DAppProvider>
    </React.StrictMode>
);

reportWebVitals();
