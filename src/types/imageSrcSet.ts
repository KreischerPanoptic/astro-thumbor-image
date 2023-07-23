import type {ThumborProps} from "./thumborProps";

export interface SetProps {
    thumbor? : ThumborProps;
    src: string;
    size?: number;
    mode?: "width" | "resolution";
}
