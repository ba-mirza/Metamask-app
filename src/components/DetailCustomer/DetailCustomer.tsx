import scss from './DetailCustomer.module.scss';
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import React from "react";
import {fetcher} from "../../shared/helpers/functions";
import {env} from "../../environments/environments";
import {Customer} from "../../types/types";

function DetailCustomer() {
    const {id} = useParams()
    const [customer, setCustomer] = React.useState<Customer>();

    console.log(customer);

    React.useEffect(() => {
        fetcher(env.url + `/id/${id}`).then((c: Customer) => setCustomer(c));
    }, [])

    return (
        <div className={scss.main}>
            <Header />
            <div className={scss.data}>
                <h1>PERSONAL DATA</h1>
                <div>
                    <span>NAME</span>
                    <h2>{customer?.username}</h2>
                    <span>EMAIL</span>
                    <h2>{customer?.email}</h2>
                    <span>WALLET</span>
                    <h2>{customer?.address}</h2>
                </div>
            </div>
        </div>
    )
}

export default DetailCustomer;
