import {titleOfButton} from "../../shared/utils/constants";
import scss from './Header.module.scss';
import React from "react";
import {useEthers} from "@usedapp/core";

declare var window: any

type Props = {
    setDialog?: (state: boolean) => void;
    returnWallet?: (wallet: string | undefined) => void;
}
function Header(props: Props) {
    const {setDialog, returnWallet} = props;
    const {account, activateBrowserWallet} = useEthers();
    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask)
    }
    const connectWallet = () => {
        if(!isMetaMaskInstalled()) {
            if (setDialog) {
                setDialog(true);
            }
        } else {
            activateBrowserWallet();
            if (returnWallet) {
                returnWallet(account);
            }
        }
    }

    return (
        <header>
            <div className={scss.logo}>
                <div>LOGO</div>
            </div>
            <button className={scss.connect_mm}
                    onClick={connectWallet}>
                {account ? account : titleOfButton}
            </button>
        </header>
    )
}

export  default Header;
