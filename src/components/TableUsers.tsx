import table from './TableUsers.module.scss';
import {Customer, MetaData} from "../types/types";

interface Props {
    data: MetaData | undefined;
}

function TableUsers(props: Props) {
    const {data} = props;
    console.log(props)
    return (
        <div className={table.table_wrapper}>
            {/*{data.items.map((user: any) => {(*/}
            {/*    <div>*/}
            {/*        <h1>{user.username}</h1>*/}
            {/*    </div>*/}
            {/*)})}*/}
            <table className={table.customers}>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WALLET</th>
                <tr>
                    <td>Rojer Waters</td>
                    <td>Charadeyouare@gmail.com</td>
                    <td>0x279D9f0c10fBB3D44fEf96...</td>
                </tr>
                <tr>
                    <td>Rojer Waters</td>
                    <td>Charadeyouare@gmail.com</td>
                    <td>0x279D9f0c10fBB3D44fEf96...</td>
                </tr>
            </table>
        </div>
    )
}

export default TableUsers;
