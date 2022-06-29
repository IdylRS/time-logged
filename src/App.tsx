import React, { useState } from 'react';
import './App.css';

import Button from './Button/Button';
import Glitch from './Glitch/Glitch';
import { Items } from './items';
import RollScreen from './RollScreen/RollScreen';
import { Item } from './types';

function App() {
  const [currentMission, setCurrentMission] = useState<Item | null>(null);
  const [currentRandoms, setCurrentRandoms] = useState<string[] | null>(null);
  const [playAnimation, setPlayAnimation] = useState(false);

  const animationLength = 10000;

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
      
      <h1 className="title">TIMELOGGED</h1>

      { playAnimation && <RollScreen selection={currentMission} randoms={currentRandoms}></RollScreen> }

      {!playAnimation && 
        <>
          <div className="mission">
            <h3 className="mission__label">Current Mission</h3>
            <div>{currentMission?.name || `N\\A`}</div>
          </div> 

          <Button label="Next Mission" onClick={generateMission}></Button>
        </>
      }
    </div>
  );
}

export default App;
