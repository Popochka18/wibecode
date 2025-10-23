import React, { useState } from 'react';
import CharacterGenerator from './components/CharacterGenerator';
import ImageEditor from './components/ImageEditor';
import { Tabs, Tab } from './components/Tabs';
import { UserIcon, PhotoIcon } from './components/Icons';

type ActiveTab = 'generator' | 'editor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');

  return (
    <div className="min-h-screen bg-slate-900 text-amber-50 selection:bg-amber-500 selection:text-slate-900">
      <header className="bg-slate-950/50 backdrop-blur-sm border-b border-amber-900/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-amber-500">
                  <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.933l-9 5.25v9l8.628-5.033A.75.75 0 0 0 22.5 16.5v-8.25a.75.75 0 0 0-.75-.317Z" />
                  <path d="M2.25 7.933a.75.75 0 0 0-.75.317V16.5a.75.75 0 0 0 1.122.65l8.628 5.033v-9l-9-5.25Z" />
                </svg>
              <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-100">D&D Character & Image Forge</h1>
            </div>
            <Tabs>
              <Tab 
                isActive={activeTab === 'generator'} 
                onClick={() => setActiveTab('generator')}
              >
                <UserIcon className="w-5 h-5 mr-2"/>
                Character Generator
              </Tab>
              <Tab 
                isActive={activeTab === 'editor'} 
                onClick={() => setActiveTab('editor')}
              >
                <PhotoIcon className="w-5 h-5 mr-2"/>
                Image Editor
              </Tab>
            </Tabs>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'generator' && <CharacterGenerator />}
        {activeTab === 'editor' && <ImageEditor />}
      </main>
    </div>
  );
};

export default App;
