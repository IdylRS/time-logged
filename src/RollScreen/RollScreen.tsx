import React, { useState } from "react";
import './RollScreen.css';

import Glitch from '../Glitch/Glitch';
import { Item } from "../types";

interface Props {
    selection: Item | null;
    randoms: string[] | null;
}

const RollScreen = ({ selection, randoms }: Props) => {
    const [playAnimation, setPlayAnimation] = useState(false);

    return (
        <div className="container">
            <Glitch label="Your next mission is..."></Glitch>

            <div className="wheel">
                <div className="wheelAnim">
                    <div className="wheelAnimText">{randoms?.map(item => <>{item}<br /></>)}</div>
                </div>
            </div>
        </div>
    )
}

export default RollScreen;
