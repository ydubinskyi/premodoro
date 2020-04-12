import { FunctionalComponent, h } from "preact";
import * as styles from "./style.css";

export interface Props {
    time: number;
    className: string;
}

const TimeText: FunctionalComponent<Props> = ({ time, className }: Props) => {
    const addZero = (value: number): string =>
        value < 10 ? `0${value}` : `${value}`;

    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return (
        <div className={className}>
            <p class={styles.text}>
                {addZero(minutes)}:{addZero(seconds)}
            </p>
        </div>
    );
};

export default TimeText;
