import { FunctionalComponent, h } from "preact";

import Play from "./play";
import Pause from "./pause";

export interface SVGIconProps {
    name?: string;
    style?: string;
    fill?: string;
    width?: string;
}

const Icon: FunctionalComponent<SVGIconProps> = (props: SVGIconProps) => {
    switch (props.name) {
        case "play":
            return <Play {...props} />;
        case "pause":
            return <Pause {...props} />;
        default:
            return <span>No icon</span>;
    }
};

export default Icon;
