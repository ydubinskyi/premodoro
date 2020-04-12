import { FunctionalComponent, h } from "preact";
import { DOMAttributes } from "../../declaration";
import * as style from "./style.css";

import Icon, { SVGIconProps } from "../icon";

const IconButton: FunctionalComponent<SVGIconProps &
    DOMAttributes<EventTarget>> = (
    props: SVGIconProps & DOMAttributes<EventTarget>
) => {
    return (
        <button class={style.button} {...props}>
            <Icon name={props.name} width={props.width} fill={props.fill} />
        </button>
    );
};

export default IconButton;
