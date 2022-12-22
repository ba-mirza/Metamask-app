import {titleOfButton} from "../../shared/utils/constants";
import scss from './Header.module.scss';
import React from "react";

type Props = {
    connectWallet?: () => void;
    account?: string | undefined;
}
function Header(props: Props) {
    const {connectWallet, account} = props;

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
