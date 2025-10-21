import logo from './logo.svg';
import './App.css';
import './components-standalone/os/Styles/OSStyle.css'
import OSWindowButton from './components-standalone/os/OSWindowButton/OSWindowButton';
import OSWindow from './components-standalone/os/OSWindow/OSWindow';
import './components-standalone/os/Styles/OSStyle.css'
import OSDesktopBackground from './components-standalone/os/OSDesktopBackground/OSDesktopBackground';
import OSTaskBar from './components-standalone/os/OSTaskBar/OSTaskBar';
import './components-standalone/os/Styles/OSStyle.css'

function App() {
  return (
    <div className="App">

      <div className='screen'>
        <OSDesktopBackground/>
        <OSTaskBar>Jaunty Jackalope</OSTaskBar>

        <OSWindow>
          <p>asdaos dasd asd asdjioasdoas dasd</p>
          <textarea>dasdjasdjasod </textarea>
        </OSWindow>
      </div>

    </div>
  );
}

export default App;
