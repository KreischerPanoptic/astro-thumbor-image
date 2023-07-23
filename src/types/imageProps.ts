import type {ThumborProps} from "./thumborProps";
import type {SetProps} from "./imageSrcSet";

export interface ImageProps {
    thumbor?: ThumborProps;
    alt: string;
    src: string;
    height?: string;
    width?: string;
    decoding?: "sync" | "async" | "auto";
    loading?: "lazy" | "eager";
    srcset?: SetProps;
    class?: string;
}
