import { useTab } from "../hooks/useTab";
import Settings from "./Settings.component";
import Transactions from "./Transactions.component";
import UploadTransactions from "./UploadTransactions.component";

const DashboardContent = () => {
  const { activeTab } = useTab();

  if (activeTab === "upload") {
    return <UploadTransactions />;
  }

  if (activeTab === "dashboard") {
    return <Transactions />;
  }

  return <Settings />;
};

export default DashboardContent;
