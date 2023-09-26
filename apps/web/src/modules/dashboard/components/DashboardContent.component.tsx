import { useTab } from "../hooks/useTab";
import UploadTransactions from "./UploadTransactions.component";

const DashboardContent = () => {
  const { activeTab } = useTab()
  
  if (activeTab === 'upload') {
    return <UploadTransactions />
  }

  return <p>Dashboard</p>
}

export default DashboardContent;
