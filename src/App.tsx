import React from 'react';
import './App.scss';
import { motion } from "framer-motion"
import TableUsers from "./components/TableUsers";
import {titleOfButton} from "./shared/utils/constants";
import {customTransition} from "./shared/utils/animateProps";
import {fetcher} from "./shared/helpers/functions";
import {Customer, FormValues, MetaData} from "./types/types";

// Metamask Dependency
import { useEthers } from "@usedapp/core";
import {SubmitHandler, useForm} from "react-hook-form";

// Ссылку можно хранить отдельно в environment
const URL = "https://new-backend.unistory.app/api/data";

function App() {
    const [dialog, setDialog] = React.useState<boolean>(false);
    const [dataCustomers, setDataCustomers] = React.useState<Customer[]>([]);
    const [errorServer, setErrorServer] = React.useState(null);
    const [skeleton, setSkeleton] = React.useState<boolean>(false);
    const [accountState, setAccountState] = React.useState<boolean>(false);
    const {activateBrowserWallet, account} = useEthers();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const newValue = Object.assign(values, account);
        console.log(newValue)
        setDataCustomers((prev) => {
            return [...prev];
        })
    }

    if(account) {
        setAccountState((prevState) => prevState = true);
    }


    React.useEffect(() => {
        fetcher(URL)
            .then((data: MetaData) => {
            if(!data) {
                setSkeleton((prev) => prev = true)
            }
            setDataCustomers(data.items);
            setSkeleton((prev) => prev = false)
        })
            .catch((error) => setErrorServer(error.json()))

    }, [])

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
                <button className="connect_mm"
                        onClick={() => activateBrowserWallet()}>
                    {accountState ? account : titleOfButton}
                </button>
            </header>
            <div className="planet">
                {/*<img className="round back" src="/background-planet.png" alt="back-planet"/>*/}
                <img className="round" src="/planet.png" alt="planet"/>
                {/*<div className="round textMask"></div>*/}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input_wrapper">
                            <span>NAME</span>
                            <div className="input">
                                <input
                                    {...register("username")}
                                    required
                                    placeholder="We will display your name in participation list"/>
                            </div>
                        </div>
                        <div className="input_wrapper">
                            <span>EMAIL</span>
                            <div className="input">
                                <input
                                    {...register("email")}
                                    required
                                    placeholder="We will display your name in participation list"/>
                            </div>
                        </div>
                        <input className="access" type="submit" value="GET EARLY ACCESS"/>
                    </form>
                </div>
            </div>
            <div className="tableUI">
                {skeleton && (<div>Loading...</div>)}
                {errorServer && (<div>Something went wrong...</div>)}
                <span>Participation listing (enable only for participants)</span>
                <TableUsers dataUsers={dataCustomers}/>
            </div>
        </div>
    </div>
  );
}

export default App;
