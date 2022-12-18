import React from 'react';
import './App.scss';
import { motion } from "framer-motion"
import TableUsers from "./components/TableUsers";
import {titleOfButton} from "./shared/utils/constants";
import {customTransition} from "./shared/utils/animateProps";
import useSWR from 'swr';
import {fetcher} from "./shared/helpers/functions";
import {MetaData} from "./types/types";

const URL = "https://new-backend.unistory.app/api/data";

function App() {
    const [dialog, setDialog] = React.useState<boolean>(false);
    const {data, error, isLoading} = useSWR<MetaData>(URL, fetcher);

    window.addEventListener('load', () => {
        setTimeout(() => {
            setDialog((prevState) => prevState = true)
        }, 300)
    });

    const closeDialog = () => {
        setDialog((prevState) => prevState = false);
    }

  return (
    <div className="App">
        <div className="container">
            {dialog && (
                <motion.div className="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={customTransition}>
                    <motion.div className="dialog"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={customTransition}>
                        <h1>METAMASK EXTENSION</h1>
                        <p>To work with our application, you have to <br /> install the <span style={{color: "#E75626"}}>Metamask browser extension</span></p>
                        <button onClick={closeDialog}>Skip this step</button>
                    </motion.div>
                </motion.div>
            )}
            <header>
                <div className="logo">
                    <div>LOGO</div>
                </div>
                <button className="connect_mm">
                    {titleOfButton}
                </button>
            </header>
            <div className="planet">
                {/*<img src="" alt=""/>*/}
                <motion.div className="round"
                            animate={{ rotate: 180 }}
                            transition={{ type: "spring", duration: 0.8 }}>
                </motion.div>
            </div>
            <div className="content_wrapper">
                <div className="content">
                    <div>
                        <h1>EXPLORE YOUR OWN PLANET <br />
                            IN <span>OUR NEW</span> METAVERSE
                        </h1>
                        <div style={{width: "421px"}}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                    </div>
                    <div className="stats">
                        <h1>ROADMAP STATS</h1>
                        <div className="numbers">
                            {/*TODO: I know, it is not cool. At this stroke we can store objects in array in useState. Then, with func map to iterate of array*/}
                            <div>
                                <span>12, 345</span>
                                <p>LOREM IPSUM DOLOR</p>
                            </div>
                            <hr/>
                            <div>
                                <span>12, 345</span>
                                <p>LOREM IPSUM DOLOR</p>
                            </div>
                            <hr/>
                            <div>
                                <span>12, 345</span>
                                <p>LOREM IPSUM DOLOR</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container second">
            <div className="forms">
                <div>
                    <h1>BETA TEST REGISTRATION</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="inputs">
                    <div className="input_wrapper">
                        <span>NAME</span>
                        <div className="input">
                            <input type="text" required placeholder="We will display your name in participation list"/>
                        </div>
                    </div>
                    <div className="input_wrapper">
                        <span>EMAIL</span>
                        <div className="input">
                            <input type="email" required placeholder="We will display your name in participation list"/>
                        </div>
                    </div>
                </div>
                <button className="">GET EARLY ACCESS</button>
            </div>
            <div className="tableUI">
                {isLoading && (<div>Loading...</div>)}
                {error && (<div>Something went wrong...</div>)}
                <span>Participation listing (enable only for participants)</span>
                <TableUsers data={data}/>
            </div>
        </div>
    </div>
  );
}

export default App;
