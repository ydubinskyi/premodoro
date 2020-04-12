import { FunctionalComponent, h } from "preact";

import { SVGIconProps } from ".";

const SVG: FunctionalComponent<SVGIconProps> = ({
    name,
    style = "",
    fill = "#fff",
    width = "24"
}: SVGIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={width}
        width={width}
        fill={fill}
        viewBox="0 0 24 24"
        style={style}
        class={name}
    >
        <path d="M10 16c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1zm2-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-4c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1z" />
    </svg>
);

export default SVG;
