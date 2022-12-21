import dialog from "./Dialog.module.scss";
import {customTransition} from "../../shared/utils/animateProps";
import {motion} from "framer-motion";
import React from "react";

function Dialog({handleClick, openInstall}: any) {
    return (
        <motion.div className={dialog.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={customTransition}>
            <motion.div className={dialog.dialog}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={customTransition}>
                <h1>METAMASK EXTENSION</h1>
                <p>To work with our application, you have to <br /> install the <span style={{color: "#E75626"}}>Metamask browser extension</span></p>
                <button onClick={handleClick}>Skip this step</button>
                <button onClick={openInstall}>Open Extension</button>
            </motion.div>
        </motion.div>
    )
}

export default Dialog;
