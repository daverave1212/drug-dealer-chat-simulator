import logo from './logo.svg';
import './App.css';
import './components-standalone/os/Styles/OSStyle.css'
import './components-standalone/os/Styles/OSStyle.css'
import OSDesktopBackground from './components-standalone/os/OSDesktopBackground/OSDesktopBackground';
import OSTaskBar from './components-standalone/os/OSTaskBar/OSTaskBar';
import OSDesktopIcons from './components-standalone/os/OSDesktopIcons/OSDesktopIcons';
import './components-standalone/os/Styles/OSStyle.css'
import { NOTEPAD_CONFIG } from './os-apps/Notepad/Notepad';
import { useState } from 'react';
import OpenAppsContextProvider from './global-state/OpenAppsContext';
import StartContextMenuContext from './global-state/StartContextMenuContext';
import OSStartContextMenu from './components-standalone/os/OSStartContextMenu/OSStartContextMenu';
import { ALL_APPS } from './services/app-manager';
import OSOpenApps from './components-standalone/os/OSOpenApps/OSOpenApps';

const APP_CONFIG_TEMPLATE = {
  name: 'F-Spot',
  menuItems: ['Photo', 'Edit', 'View', 'Help']
}

function App() {

  // OS App manager
  

  // Start context menu
  const [isStartContextMenuOpen, setIsStartContextMenuOpen] = useState(false)

  return (
    <div className="App">

      <OpenAppsContextProvider>
      <StartContextMenuContext value={{isStartContextMenuOpen, setIsStartContextMenuOpen}}>
        
        <div className='screen'>
          <OSStartContextMenu/>
          <OSDesktopBackground/>
          <OSDesktopIcons/>
          <OSTaskBar>Jaunty Jackalope</OSTaskBar>
          <OSOpenApps/>
        </div>


      </StartContextMenuContext>
      </OpenAppsContextProvider>


    </div>
  );
}

export default App;
