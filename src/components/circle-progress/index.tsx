import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Props {
    radius: number;
    stroke: number;
    progress: number;
}

const CircleProgress: FunctionalComponent<Props> = ({
    radius,
    stroke,
    progress
}: Props) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                class={style.circle}
                stroke="white"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                stroke-dasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                stroke-width={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

export default CircleProgress;
