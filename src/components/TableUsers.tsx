import table from './TableUsers.module.scss';
import {Customer, MetaData} from "../types/types";

interface Props {
    dataUsers: Customer[] | undefined;
}

function TableUsers(props: Props) {
    const {dataUsers} = props;
    return (
        <div className={table.table_wrapper}>
            <table className={table.customers}>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WALLET</th>
                {
                    dataUsers?.map((c: Customer) => (
                        <tr key={c.id}>
                            <td>{c.username}</td>
                            <td>{c.email}</td>
                            <td>{c.address}</td>
                            <td>x</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default TableUsers;
