import Loading from "../../../shared/components/Loading.component";
import { Transaction } from "../../../shared/types";

type Props = {
  transactions: Transaction[];
  totalPages: number;
  loading?: boolean;
  changePageFn: (pageNumber: number) => void;
  currentPage: number;
};

function generateOffsetArray(totalPages: number): number[] {
  const result: number[] = [];

  for (let i = 0; i < totalPages; i++) {
    result.push(i);
  }

  return result;
}

const TransactionsTable = (props: Props) => {
  const pages = generateOffsetArray(props.totalPages);

  if (props.loading) {
    return <Loading />;
  }

  const isCurrentPage = (page: number) => page === props.currentPage;
  const isCurrentPageCssLoader = (page: number) =>
    isCurrentPage(page)
      ? `bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 `
      : ``;

  const handlePagination = (page: number) => {
    if (page === props.currentPage) return;

    props.changePageFn(page);
  };

  return (
    <div className="relative overflow-x-auto">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {pages.map((pageNumber) => (
            <li key={`page-${pageNumber + 1}`}>
              <button
                onClick={() => handlePagination(pageNumber)}
                aria-current={isCurrentPage(pageNumber)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isCurrentPageCssLoader(
                  pageNumber
                )}`}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

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
          {props.transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {transaction.type}
              </th>
              <td className="px-6 py-4">{transaction.date}</td>
              <td className="px-6 py-4">{transaction.product}</td>
              <td className="px-6 py-4">{transaction.amount}</td>
              <td className="px-6 py-4">{transaction.seller}</td>
              <td className="px-6 py-4">{transaction.description}</td>
              <td className="px-6 py-4">{transaction.nature}</td>
              <td className="px-6 py-4">{transaction.signal}</td>
            </tr>
          ))}
        </tbody>

        {!props.transactions.length && <div>No data to show.</div>}
      </table>
    </div>
  );
};

export default TransactionsTable;
