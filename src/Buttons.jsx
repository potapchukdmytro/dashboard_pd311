import './Buttons.css';

export function SolidButton ({ value = "Button text", color = "green-btn" }) {
    return (
        <button className={`solid-button ${color}`}>{value}</button>
    );
};

export const OutlineButton = (props) => {
    return (
        <button className={`outline-button`}>{props.value}</button>
    );
};