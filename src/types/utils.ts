import type {SetProps} from "./imageSrcSet";
import {buildUrl} from "./thumborProps";

export function srcToUrl(src: string): URL {
    return new URL(src);
}

export function encodeURL(src: URL) : string {
    return encodeURIComponent(src.toString());
}

export function srcSetToString(srcSet: SetProps) : string {
    let result = '';
    if (srcSet.thumbor) {
        result += buildUrl(srcSet.src, srcSet.thumbor);
    }
    else {
        result += srcSet.src;
    }

    if (srcSet.size) {
        switch (srcSet.mode) {
            case "width":
                result += ` ${srcSet.size}w`;
                break;
            case "resolution":
                result += ` ${srcSet.size}x`;
                break;
        }
    }

    return result;
}
