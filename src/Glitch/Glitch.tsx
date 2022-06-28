import React from "react";
import './Glitch.css';

interface Props {
    label: string;
}

const Glitch = ({label}: Props) => {
    const stackStyle = { "--stacks": 3 } as React.CSSProperties;
    const stackStyles = [0, 1, 2].map((el, i) => ({ "--index": i } as React.CSSProperties))

    return (
        <div className="stack" style={stackStyle}>
            <span style={stackStyles[0]}>{label}</span>
            <span style={stackStyles[1]}>{label}</span>
            <span style={stackStyles[2]}>{label}</span>
        </div>
    )
}

export default Glitch;