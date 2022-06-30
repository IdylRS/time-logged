import { useEffect, useState } from 'react'
import { CompletedMission, Mission, Task } from '../types';
import _ from 'underscore';
import './Table.scss';

interface Props {
    readOnly: boolean;
    tableHeaders: string[];
    data: any;
    indexes: string[];
    sortableCols: boolean[];
    tier?: number;
    onMarkedComplete?: Function;
    idIndex: string;
    completed: CompletedMission[];
    colSizes?: string[];
    defaultSort?: { index: string, asc: boolean };
    currentMission?: Mission;
}

function Table(props: Props) {
    const [data, setData] = useState<any>(props.data);
    const [hideCompleted, setHideCompleted] = useState(false);
    const [currentSort, setCurrentSort] = useState(props.defaultSort)
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const [failedIds, setFailedIds] = useState<string[]>([]);

    useEffect(() => {
        let completedItems = _.pluck(props.completed.filter(m => m.success), 'item');
        let completedIds = _.pluck(completedItems, 'id');

        let failedItems = _.pluck(props.completed.filter(m => !m.success), 'item');
        let failedIds = _.pluck(failedItems, 'id');


        setCompletedIds(completedIds);
        setFailedIds(failedIds)
    }, []);

    const handleChecked = (el: any) => {
        if (props.onMarkedComplete) props.onMarkedComplete(el);
    }

    const filterData = (query: string) => {
        let newData = [...props.data];

        newData = newData.filter(el => {
            let lowerQuery = query.toLowerCase();

            return props.indexes.some(index => el[index] && el[index].toString().toLowerCase().includes(lowerQuery))
        })

        setData(newData);
        sortData(currentSort, newData);
    }

    const sortColumn = (i: number) => {
        const index = props.indexes[i];

        let asc = true;
        if (currentSort?.index === index && currentSort.asc === true) {
            asc = false;
        }

        setCurrentSort({ index: index, asc: asc })
        sortData({ index: index, asc: asc })
    }

    const sortData = (newSort?: {index: string, asc: boolean}, sortData = data) => {
        let newData = [...sortData];
        const sort = newSort || currentSort;

        if (sort?.asc === true) {
            newData = newData.sort((a, b) => a[sort.index] > b[sort.index] ? 1 : -1);
        }
        else if(sort) {
            newData = newData.sort((a, b) => a[sort.index] < b[sort.index] ? 1 : -1);
        }

        setData(newData);
    }

    // useEffect(() => {
    //     let newData = [...props.data];

    //     if (currentSort?.asc === true) {
    //         newData = newData.sort((a, b) => a[currentSort.index] > b[currentSort.index] ? 1 : -1);
    //     }
    //     else if(currentSort) {
    //         newData = newData.sort((a, b) => a[currentSort.index] < b[currentSort.index] ? 1 : -1);
    //     }

    //     setData(newData);
    // }, [currentSort, props.data]);

    return (
        <>
            <div className="filters">
                <input
                    type="text"
                    className="filters__text"
                    placeholder="Type to filter..."
                    onChange={e => filterData(e.target.value)}
                ></input>
                <input
                    type="checkbox"
                    className="filters__checkbox"
                    name="hide"
                    id="hide"
                    onChange={e => setHideCompleted(!hideCompleted)}
                    checked={hideCompleted}
                ></input>
                <label htmlFor="hide">Hide Completed</label>
            </div>
            <span>Total entries: {
                data.filter((el: any) =>
                    (el.tier === props.tier || props.tier === 0) && (hideCompleted ? !completedIds.includes(el[props.idIndex]) : true))
                    .length
            }</span>
            <table className="table">
                <thead>
                    <tr className="table__header">
                        {
                            props.tableHeaders.map((header, i) => 
                                props.sortableCols[i] ? 
                                    <th key={header}>
                                        <button className="table__header-sortable" onClick={e => sortColumn(i)}>
                                            {header} {currentSort?.index === props.indexes[i] ? currentSort.asc ? '▲' : '▼' : '' }
                                        </button>
                                    </th>
                                :   <th key={header}>{header}</th>
                            )
                        }
                        <th>✓</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            .filter((el: any) => (el.tier === props.tier || props.tier === 0) && (hideCompleted ? !completedIds.includes(el[props.idIndex]) : true))
                            .map((el: any) =>
                                <tr
                                    key={el[props.idIndex]}
                                    className={
                                        `table__row ${props.readOnly ? 'read-only ' : ''}${props.currentMission && props.currentMission.item.id === el[props.idIndex] ? 'progress' : ''} ${completedIds.includes(el[props.idIndex]) ? `complete` : ``} ${failedIds.includes(el[props.idIndex]) ? `failed` : ``}`
                                    }
                                    onClick={() => !props.readOnly ? handleChecked(el) : ''}
                                >
                                    {
                                        props.indexes.map((index: string, id: number) => {
                                            let newIndexes: string[] = index.includes('.') ? index.split('.') : [index];
                                            let value = newIndexes.reduce((prev: any, cur: string) => prev[cur], el);
                                            return (
                                                <td
                                                    className={props.colSizes ? props.colSizes[id] : ``}
                                                    key={value}
                                                >
                                                    { 
                                                        index === 'image' ? 
                                                            <div className="table__image">
                                                                <img className="table__imageSrc" alt="item icon" src={value}></img>
                                                            </div> : 
                                                            Array.isArray(value) ? value.join(', ') : value 
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                    <td className="table__cell checkbox">
                                        <input
                                            type="checkbox"
                                            disabled={props.readOnly}
                                            onChange={() => handleChecked(el)}
                                            checked={completedIds.includes(el[props.idIndex])}
                                        />
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
            <br/>
            <br/>
        </>
    )
}

export default Table
