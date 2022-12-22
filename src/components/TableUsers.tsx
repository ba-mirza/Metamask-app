import table from './TableUsers.module.scss';
import {Customer, MetaData} from "../types/types";

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
        <div className={table.table_wrapper}>
            <table className={table.customers}>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WALLET</th>
                {
                    dataUsers.map((c: Customer) => (
                        <tr key={c.id}>
                            <td>{c.username}</td>
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
