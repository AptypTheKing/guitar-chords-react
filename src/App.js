import { useState } from 'react';
import './App.css';
import ChordsAndOption from './components/ChordsAndOptions/ChordsAndOptions';
import Guitar from './components/guitar/Guitar';



function App() {
  
  return (
    <div className="App">
      <h1>CHOOSE THE CHORD</h1>
        <ChordsAndOption/>
        <Guitar/>
    </div>
  );
}

export default App;
