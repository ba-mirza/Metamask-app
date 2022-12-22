import React from 'react';
import './App.scss';
import TableUsers from "./components/TableUsers";
import {titleOfButton} from "./shared/utils/constants";
import {fetcher} from "./shared/helpers/functions";
import {Customer, FormValues, MetaData} from "./types/types";

// Metamask Dependency
import { useEthers } from "@usedapp/core";
import {SubmitHandler, useForm} from "react-hook-form";
import Dialog from "./components/Dialog/Dialog";
import MetaMaskOnboarding from "@metamask/onboarding";
declare var window: any

// Ссылку можно хранить отдельно в environment
const URL = "https://new-backend.unistory.app/api/data";

function App() {
    const [dialog, setDialog] = React.useState<boolean>(false);
    const [dataCustomers, setDataCustomers] = React.useState<Customer[]>([]);
    const [errorServer, setErrorServer] = React.useState(null);
    const [skeleton, setSkeleton] = React.useState<boolean>(false);
    const [accountState, setAccountState] = React.useState<boolean>(false);
    const {account, activateBrowserWallet} = useEthers();
    const { register, handleSubmit } = useForm<FormValues>();

    const metaMask = new MetaMaskOnboarding();

    React.useEffect(() => {
        window.addEventListener('load', () => {
            setTimeout(() => {
                setDialog((prevState) => prevState = true)
            }, 100)
        });
    })

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask)
    }


    const connectWallet = () => {
        if(!isMetaMaskInstalled()) {
            setDialog((prevState) => prevState = true);
        } else {
            activateBrowserWallet()
        }
    }

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const {username, email} = values;
        const newCustomer: Customer = {
            id: Math.floor(Math.random() * 1000),
            username,
            email,
            address: account
        }
        setDataCustomers((prev) => {
            return [newCustomer, ...prev];
        });
    }

    const deleteCustomer = (id: number) => {
        const newDataCustomers = dataCustomers.filter((c: Customer) => c.id !== id);
        setDataCustomers((prev) => (newDataCustomers));
    }

    // TODO: RE-RENDER MOMENTS FIXED
    // if(account) {
    //     setAccountState((prevState) => prevState = true);
    // }

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

    const closeDialog = () => {
        setDialog((prevState) => prevState = false);
    }


  return (
    <div className="App">
        <div className="container">
            {dialog && ( <Dialog handleClick={closeDialog} openInstall={() => metaMask.startOnboarding()} /> )}
            <header>
                <div className="logo">
                    <div>LOGO</div>
                </div>
                <button className="connect_mm"
                        onClick={connectWallet}>
                    {account ? account : titleOfButton}
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
                <TableUsers deleteCustomer={deleteCustomer} dataUsers={dataCustomers}/>
            </div>
        </div>
    </div>
  );
}

export default App;
