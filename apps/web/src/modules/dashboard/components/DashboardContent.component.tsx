import { useTab } from "../hooks/useTab";
import Transactions from "./Transactions.component";
import UploadTransactions from "./UploadTransactions.component";

const DashboardContent = () => {
  const { activeTab } = useTab()
  
  if (activeTab === 'upload') {
    return <UploadTransactions />
  }

  return <Transactions />
}

export default DashboardContent;
