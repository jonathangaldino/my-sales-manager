import Loading from "../../../shared/components/Loading.component";
type Analytics = {
  paidComission: number;
  receivedComission: number;
  affiliateSales: number;
  producerSales: number;
};

type Props = {
  analytics?: Analytics;
  isLoading?: boolean;
};

const formatAnalytics = (analytics: Analytics) => {
  const parseInReal = (value: number) =>
    (value / 100).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

  return {
    paidComission: parseInReal(analytics.paidComission),
    receivedComission: parseInReal(analytics.receivedComission),
    affiliateSales: parseInReal(analytics.affiliateSales),
    producerSales: parseInReal(analytics.producerSales),
  };
};

const createAnalyticsArr = (analytics: Analytics) => {
  const formatted = formatAnalytics(analytics!);
  const analyticsArr = [
    {
      description: "Comissão Recebida",
      value: formatted.receivedComission,
      color: "green",
    },
    {
      description: "Comissão Paga",
      value: formatted.paidComission,
      color: "red",
    },
    {
      description: "Venda Produtor",
      value: formatted.producerSales,
      color: "green",
    },
    {
      description: "Venda Afiliado",
      value: formatted.affiliateSales,
      color: "blue",
    },
  ];

  return analyticsArr;
};

const TransactionsAnalytics = ({ analytics, isLoading }: Props) => {
  if (isLoading || !analytics) {
    return <Loading />;
  }

  const analyticsArr = createAnalyticsArr(analytics);

  return (
    <>
      <div className="m-10 grid gap-5 sm:grid-cols-3  mx-auto max-w-screen-lg">
        {analyticsArr.map(({ description, value, color }) => (
          <div
            className="px-4 py-6 shadow-lg shadow-blue-100"
            key={description}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-14 w-14 rounded-xl bg-${color}-400 p-4 text-white`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 font-medium">{description}</p>
            <p className="mt-2 text-xl font-medium">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionsAnalytics;
