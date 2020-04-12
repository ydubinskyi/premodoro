import { FunctionalComponent, h } from "preact";

export interface Props {
    time: number;
}

const TimeText: FunctionalComponent<Props> = ({ time }: Props) => {
    const addZero = (value: number): string =>
        value < 10 ? `0${value}` : `${value}`;

    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return (
        <p>
            {addZero(minutes)}:{addZero(seconds)}s
        </p>
    );
};

export default TimeText;
