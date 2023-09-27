import Loading from "../../../shared/components/Loading.component";
import { Transaction } from "../../../shared/types";

type Props = {
    transactions: Transaction[],
    totalPages: number;
    loading?: boolean;
}

const TransactionsTable = (props: Props) => {
    if (props.loading) {
        return <Loading />
    }
    

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Vendedor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descrição
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Natureza
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sinal
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        props.transactions.map(transaction => (
                            <tr key={transaction.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {transaction.type}
                                </th>
                                <td className="px-6 py-4">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.product}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.amount}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.seller}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.description}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.nature}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.signal}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

                {!props.transactions.length && (
                    <div>No data to show.</div>
                )}
            </table>
        </div>
    )
}

export default TransactionsTable;
