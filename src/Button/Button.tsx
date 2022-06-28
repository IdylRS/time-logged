import React, { MouseEventHandler } from 'react';
import './Button.css';

interface Props {
    label: string;
    onClick: MouseEventHandler;
    fontSize?: string;
    bgColor?: string;
    borderColor?: string;
}

const Button = ({label, fontSize, bgColor, borderColor, onClick}: Props) => {
    const style = { "--fontSize": fontSize || "32px", "--bgColor": bgColor || "black", "--borderColor": borderColor || "white" } as React.CSSProperties;

    return <button className="button" style={style} onClick={onClick}>{label}</button>
}

export default Button;