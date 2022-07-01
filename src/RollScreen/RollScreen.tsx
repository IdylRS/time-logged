import React, { useState } from "react";
import './RollScreen.css';

import Glitch from '../Glitch/Glitch';
import { Item, Mission } from "../types";
import { timeConvert } from "../helpers";

interface Props {
    selection: Mission | null;
    randoms: string[] | null;
}

const RollScreen = ({ selection, randoms }: Props) => {
    const [playAnimation, setPlayAnimation] = useState(false);

    return (
        <div className="container">
            <div className="nextMission">
                <Glitch label="Your next mission is"></Glitch>
            </div>

            <div className="wheel">
                <h2 className="wheel__title">Obtain</h2>
                <div className="wheelAnim">
                    <div className="wheelAnimText">{randoms?.map(item => <>{item}<br /></>)}</div>
                </div>
            </div>

            <div className="timeContainer">
                <h2>You have</h2>
                <div className="time">{selection && timeConvert(selection?.time)}</div>
            </div>

            <div className="timeStarts">
                Your time starts when you meet the requirements to begin.
            </div>
        </div>
    )
}

export default RollScreen;
