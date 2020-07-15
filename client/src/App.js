import React from 'react';
import Sidebar from './components/Sidebar.js'
import Player from './components/Player.js'
import Featured from './components/Featured.js'


function App() {
  return (
    <div className="App">
      <Sidebar />
      <Featured />
      <Player />
    </div>
  );
}

export default App;
