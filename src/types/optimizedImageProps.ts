import type {ImageProps} from "./imageProps";
import type FallbackImageProps from "./fallbackImageProps";

export default interface OptimizedImageProps extends FallbackImageProps {
    lowres?: ImageProps;
}
