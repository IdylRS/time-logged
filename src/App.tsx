import React, { useState } from 'react';
import './App.css';

import Button from './Button/Button';
import { Items } from './items';
import RollScreen from './RollScreen/RollScreen';
import { CompletedMission, Mission } from './types';
import { aAnNone, timeConvert } from './helpers';
import ItemPanel from './ItemPanel/ItemPanel';

function App() {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [currentRandoms, setCurrentRandoms] = useState<string[] | null>(null);
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);
  const [playAnimation, setPlayAnimation] = useState(false);

  const animationLength = 15000;

  const generateMission = () => {
    const items = Items.filter(i => i.tier === 1);

    const roll = Math.floor(Math.random() * items.length);
    const selection = items[roll];
    const randomItems = [...items].sort(() => 0.5 - Math.random());
    const randoms = randomItems.slice(0, 10).concat(selection);

    const timeRange = Math.floor(Math.random() * selection.timeRange);
    const timeMod = Math.random() < 0.5 ? timeRange * -1 : timeRange;

    setCurrentMission({ item: selection, time: selection.baseTime + timeMod });
    setCurrentRandoms(randoms.map(i => i.name));
    setPlayAnimation(true);
    setTimeout(() => setPlayAnimation(false), animationLength)
  }

  function markMissionComplete(success: boolean): void {
    if (!currentMission) return;

    let newCompletedMissions = [...completedMissions];
    const completedMission: CompletedMission = { mission: currentMission, success: success };

    newCompletedMissions = newCompletedMissions.concat(completedMission);

    setCompletedMissions(newCompletedMissions);
    setCurrentMission(null);
  }

  return (
    <div className="App">

      <h1 className="title">TIMELOGGED</h1>

      {playAnimation && <RollScreen selection={currentMission} randoms={currentRandoms}></RollScreen>}

      {!playAnimation &&
        <>
          {currentMission && <>
            <div className="mission">
              <h3 className="mission__label">Current Mission</h3>
              <div>Obtain {aAnNone(currentMission.item.name)} <span className="mission__item">{currentMission?.item.name || `N\\A`}</span> in <span className="mission__time">{timeConvert(currentMission?.time)}</span> or less.</div>
            </div>

            <div className="mission__options">
              <Button label="Complete Mission" onClick={() => markMissionComplete(true)} borderColor="#4d4"></Button>
              <Button label="Fail Mission" onClick={() => markMissionComplete(true)} borderColor="red"></Button>
            </div>
          </>
          }

          {!currentMission && <Button label="Next Mission" onClick={generateMission}></Button>}
          <br />
          <br />
          {currentMission && <ItemPanel currentMission={currentMission} completed={completedMissions}></ItemPanel>}
          {!currentMission && <ItemPanel></ItemPanel>}
        </>
      }
    </div>
  );
}

export default App;

