import { ReactNode, createContext, useContext, useState } from 'react';

type Tabs = 'upload' | 'dashboard'

type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: Tabs) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProviderProps = {
  children: ReactNode;
};

export function TabProvider({ children }: TabProviderProps) {
  const [activeTab, setActiveTab] = useState<Tabs>('upload');

  const setActiveTabValue = (newTab: Tabs) => {
    if (newTab === 'upload' || newTab === 'dashboard') {
      setActiveTab(newTab);
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: setActiveTabValue }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}
