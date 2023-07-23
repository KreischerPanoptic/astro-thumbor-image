import type {ImageProps} from "./imageProps";

export default interface FallbackImageProps extends ImageProps {
    fallback?: ImageProps;
    id: string;
}
