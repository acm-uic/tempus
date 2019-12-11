import React from 'react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import Events from './components/Events';
import Message from './components/Message';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <Weather />
        <Events />
        <Message />
        <Footer />
      </header>
    </div>
  );
}

export default App;
