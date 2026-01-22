import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GradeSyncView from './components/GradeSyncView';
import DataLinkingDashboard from './components/DataLinkingDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'data-linking' | 'grade-sync'>('data-linking');

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col ml-64 min-w-[800px] transition-all duration-300">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {currentView === 'data-linking' ? (
            <DataLinkingDashboard />
          ) : (
            <GradeSyncView />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;