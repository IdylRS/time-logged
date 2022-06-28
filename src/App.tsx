import React, { useState } from 'react';
import './App.css';

import Button from './Button/Button';
import Glitch from './Glitch/Glitch';
import { Items } from './items';
import { Item } from './types';

function App() {
  const [currentMission, setCurrentMission] = useState<Item | null>();
  const [currentRandoms, setCurrentRandoms] = useState<string[] | null>();
  const [playAnimation, setPlayAnimation] = useState(false);

  const animationLength = 4000;

  const generateMission = () => {
    const items = Items.filter(i => i.tier === 1);

    const roll = Math.floor(Math.random()*items.length);
    const selection = items[roll];
    const randoms = items.slice(Math.max(roll-10, 0), roll+1);

    console.log('selected:', selection.name)

    setCurrentMission(selection);
    setCurrentRandoms(randoms.map(i => i.name));
    setPlayAnimation(true);
    setTimeout(() => setPlayAnimation(false), animationLength)
  }

  return (
    <div className="App">
      
      <Glitch label="TIMELOGGED"></Glitch>

      <div className="mission">
        <h3 className="mission__label">Current Mission</h3>
        <div className={`missionAnim ${playAnimation ? 'animated' : ''}`}>
          { playAnimation && <div className="missionAnimText">{currentRandoms?.map(item => <>{item}<br/></>)}</div> }
          { !playAnimation && <div>{currentMission?.name || `N\\A`}</div> }
        </div>
      </div>

      <Button label="Next Mission" onClick={generateMission}></Button>
    </div>
  );
}

export default App;
