import type {ThumborProps} from "./thumborProps";
import type {SetProps} from "./imageSrcSet";
import type {ImageProps} from "./imageProps";
import type {PictureSourceProps} from "./pictureSource";

export interface PictureProps {
    image: ImageProps;
    sources: PictureSourceProps[];
    class?: string;
}
