import React from 'react';
import Dashboard from './containers/Dashboard/Dashboard'
import Nav from './components/Nav/Nav'
import './App.css';

function App() {
  return (
    <div className="App">
        <Nav />
        <Dashboard />
    </div>
  );
}

export default App;
