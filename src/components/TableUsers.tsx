import scss from './TableUsers.module.scss';
import {Customer, MetaData} from "../types/types";
import {Link} from "react-router-dom";

interface Props {
    dataUsers: Customer[];
    deleteCustomer: (id: number) => void;
}

function TableUsers(props: Props) {
    const {dataUsers, deleteCustomer} = props;

    const _deleteCustomer = (id: number) => {
        deleteCustomer(id);
    }

    return (
        <div className={scss.table_wrapper}>
            <table className={scss.customers}>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WALLET</th>
                {
                    dataUsers.map((c: Customer) => (
                        <tr key={c.id}>
                            <Link to={`/detail/${c.id}`}><td>{c.username}</td></Link>
                            <td>{c.email}</td>
                            <td>{c.address}</td>
                            <td onClick={() => _deleteCustomer(c.id)}>x</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default TableUsers;
