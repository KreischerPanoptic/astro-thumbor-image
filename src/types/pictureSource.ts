import type {SetProps} from "./imageSrcSet";
import type {ThumborProps} from "./thumborProps";

export interface PictureSourceProps {
    srcset: SetProps;
    media?: string;
    type?: 'image/apng' | 'image/avif' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'image/webp';
}
