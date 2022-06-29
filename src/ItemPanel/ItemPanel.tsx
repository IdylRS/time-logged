import _ from 'underscore';

import './ItemPanel.scss';
import { Items } from '../items';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Table from '../Table/Table';
import { Item, Task } from '../types';

interface Props {
  onMarkedComplete?: Function;
  completed?: Task[];
  currentOptions?: Task[];
  readOnly?: boolean;
}


function ItemPanel(props: Props) {
  return (
    <div className="ItemPanel">
      <Tabs>
        <TabList>
          <Tab>All Tiers</Tab>
          <Tab>Tier 1</Tab>
          <Tab>Tier 2</Tab>
          <Tab>Tier 3</Tab>
          <Tab>Tier 4</Tab>
          <Tab>Tier 5</Tab>
          <Tab>Tier 6</Tab>
        </TabList>

        {
            [0,1,2,3,4,5,6].map(num =>
                <TabPanel key={num} className="ItemPanel__container">
                    <Table
                      readOnly={props.readOnly || false}
                      tableHeaders={["Item", "", "Notes", "Tier"]}
                      indexes={["name", "image", "notes", "tier"]}
                      sortableCols={[true, false, false, true]}
                      idIndex="id"
                      data={Items}
                      tier={num}
                      completedIds={props.completed ? _.pluck(props.completed, 'referenceId') : []}
                      onMarkedComplete={(task: any) => props.onMarkedComplete ? props.onMarkedComplete(task) : null}
                      defaultSort={{ index: 'name', asc: true }}
                      currentOptions={props.currentOptions}
                    ></Table>
                </TabPanel>
            )
        }
      </Tabs>
    </div>
  );
}

export default ItemPanel;
