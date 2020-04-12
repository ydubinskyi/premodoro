import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Props {
    radius: number;
    stroke: number;
    progress: number;
    fill: string;
}

const CircleProgress: FunctionalComponent<Props> = ({
    radius,
    stroke,
    progress,
    fill
}: Props) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                class={style.circle}
                stroke={fill}
                fill="transparent"
                stroke-width={stroke}
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                stroke-dasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

export default CircleProgress;
