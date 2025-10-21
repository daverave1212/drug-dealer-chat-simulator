import logo from './logo.svg';
import './App.css';
import './components-standalone/os/Styles/OSStyle.css'
import OSWindowButton from './components-standalone/os/OSWindowButton/OSWindowButton';
import OSWindow from './components-standalone/os/OSWindow/OSWindow';

function App() {
  return (
    <div className="App">
      <OSWindow>
        <p>asdaos dasd asd asdjioasdoas dasd</p>
        <textarea>dasdjasdjasod </textarea>
      </OSWindow>
    </div>
  );
}

export default App;
