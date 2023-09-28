"use client";

import DashboardContent from "../components/DashboardContent.component";
import DashboardTab from "../components/Tab.component";
import { TabProvider } from "../hooks/useTab";

const DashboardPage = () => {
  return (
    <TabProvider>
      <DashboardTab />

      <DashboardContent />
    </TabProvider>
  )
}

export default DashboardPage;
