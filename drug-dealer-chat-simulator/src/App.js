import logo from './logo.svg';
import './App.css';
import './components-standalone/os/Styles/OSStyle.css'
import './components-standalone/os/Styles/OSStyle.css'
import OSDesktopBackground from './components-standalone/os/OSDesktopBackground/OSDesktopBackground';
import OSTaskBar from './components-standalone/os/OSTaskBar/OSTaskBar';
import OSDesktopIcons from './components-standalone/os/OSDesktopIcons/OSDesktopIcons';
import './components-standalone/os/Styles/OSStyle.css'
import { NOTEPAD_CONFIG } from './os-apps/Notepad/Notepad';
import { useEffect, useRef, useState } from 'react';
import OpenAppsContextProvider from './global-state/OpenAppsContext';
import StartContextMenuContext from './global-state/StartContextMenuContext';
import OSStartContextMenu from './components-standalone/os/OSStartContextMenu/OSStartContextMenu';
import { ALL_APPS } from './services/app-manager';
import OSOpenApps from './components-standalone/os/OSOpenApps/OSOpenApps';
import { CurrentSceneContextProvider } from './global-state/CurrentSceneContext';
import SceneRenderer from './components/SceneRenderer/SceneRenderer';
import { MousePositionContextProvider } from './global-state/MousePositionContext';
import { TooltipContextProvider } from './global-state/TooltipContext';
import Tooltip from './components-standalone/os/Tooltip/Tooltip';
import { activateDebuggingInUseEffect } from './services/game-debugger';
import { onGameTick, startRunningTasks } from './services/task-runner';
import { messengerChatTick } from './global-state/MessengerData';

function App() {

  const alreadyRanEffect = useRef(false)
  useEffect(() => {
    if (alreadyRanEffect.current) {
      return
    }
    alreadyRanEffect.current = true
    
    activateDebuggingInUseEffect()
    startRunningTasks()
    
    onGameTick('Messenger', messengerChatTick)

  }, [])

  // Start context menu
  const [isStartContextMenuOpen, setIsStartContextMenuOpen] = useState(false)

  return (
    <div className="App relative">

      <OpenAppsContextProvider>
      <StartContextMenuContext value={{isStartContextMenuOpen, setIsStartContextMenuOpen}}>
      <CurrentSceneContextProvider>
      <MousePositionContextProvider>
      <TooltipContextProvider>

        <SceneRenderer/>
        <Tooltip/>

      </TooltipContextProvider>
      </MousePositionContextProvider>
      </CurrentSceneContextProvider>
      </StartContextMenuContext>
      </OpenAppsContextProvider>


    </div>
  );
}

export default App;
