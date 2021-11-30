import logo from './logo.svg';
import './App.css';
import RequestSwipe from './components/RequestSwipe';
import SearchSwipe from './components/SearchSwipe';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RequestSwipe />
        <SearchSwipe />
      </header>
    </div>
  );
}

export default App;
