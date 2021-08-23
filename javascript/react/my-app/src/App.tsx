import React from 'react';
import './App.css';
import Header from './components/header';
import Simple from './components/simple';
import SimpleSearch from './components/simple-search';

const keywords = [
  "Apple",
  "Banana",
  "Cider",
  "Dates",
  "Eggplant",
  "Fig"
];

function App() {
  return (
    <div className="App">
      <Header />
      <Simple />
      <SimpleSearch keywords={keywords} />
   </div>
  );
}

export default App;
