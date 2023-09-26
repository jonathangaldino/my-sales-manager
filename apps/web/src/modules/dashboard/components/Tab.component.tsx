import { useTab } from "../hooks/useTab";

const DashboardTab = () => {
  const { activeTab, setActiveTab} = useTab();

  const handleActiveCss = (buttonName: 'upload' | 'dashboard') => {
    if (activeTab === buttonName) {
      return `active bg-gray-100  text-blue-600`
    }

    return ''
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`inline-block p-4 rounded-t-lg  dark:text-blue-500 ${handleActiveCss('upload')}`}
          >Upload</button>
      </li>
      <li className="mr-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${handleActiveCss('dashboard')}`}
          >Dashboard</button>
      </li>
    </ul>
  )
}
export default DashboardTab;
