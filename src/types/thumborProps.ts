import type {AbstractThumborFilterProp, Color, HtmlColor} from "./thumborFilters";
import {encodeURL, srcToUrl} from "./utils";
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export interface ThumborTrimProps {
    trimMode: "top-left" | "bottom-right" | "auto";
}

export interface ThumborFlipProps {
    flipMode: "vertical" | "horizontal" | "both";
}

export interface ThumborPointProps {
    x: number;
    y: number;
}

export interface ThumborSquareProps {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface ThumborCropProps {
    topLeft: ThumborPointProps;
    bottomRight: ThumborPointProps;
}

export interface ThumborRoundingProps {
    a?: number;
    b?: number;
    rgb: number[];
    transparent?: 0 | 1;
}



export interface ThumborProps {
    url: URL;
    key?: string;
    trim?: ThumborTrimProps;
    crop?: ThumborCropProps;
    fit?: "fit-in" | "adaptive-fit-in" | "full-fit-in";
    width?: number | "orig";
    height?: number | "orig";
    flip?: ThumborFlipProps;
    horizontalAlignment?: "left" | "center" | "right";
    verticalAlignment?: "top" | "middle" | "bottom";
    smart?: boolean;
    filters?: AbstractThumborFilterProp[];
}

function isHtmlColor(color: string): color is HtmlColor {
    return ['maroon', 'darkred', 'brown', 'firebrick', 'crimson', 'red', 'tomato', 'coral', 'indianred', 'lightcoral', 'darksalmon', 'salmon', 'lightsalmon', 'orangered', 'darkorange', 'orange', 'gold', 'darkgoldenrod', 'goldenrod', 'palegoldenrod', 'darkkhaki', 'khaki', 'olive', 'yellow', 'yellowgreen', 'darkolivegreen', 'olivedrab', 'lawngreen', 'chartreuse', 'greenyellow', 'darkgreen', 'green', 'forestgreen', 'lime', 'limegreen', 'lightgreen', 'palegreen', 'darkseagreen', 'mediumspringgreen', 'springgreen', 'seagreen', 'mediumaquamarine', 'mediumseagreen', 'lightseagreen', 'darkslategray', 'teal', 'darkcyan', 'aqua', 'cyan', 'lightcyan', 'darkturquoise', 'turquoise', 'mediumturquoise', 'paleturquoise', 'aquamarine', 'powderblue', 'cadetblue', 'steelblue', 'cornflowerblue', 'deepskyblue', 'dodgerblue', 'lightblue', 'skyblue', 'lightskyblue', 'midnightblue', 'navy', 'darkblue', 'mediumblue', 'blue', 'royalblue', 'blueviolet', 'indigo', 'darkslateblue', 'slateblue', 'mediumslateblue', 'mediumpurple', 'darkmagenta', 'darkviolet', 'darkorchid', 'mediumorchid', 'purple', 'thistle', 'plum', 'violet', 'fuchsia', 'orchid', 'mediumvioletred', 'palevioletred', 'deeppink', 'hotpink', 'lightpink', 'pink', 'antiquewhite', 'beige', 'bisque', 'blanchedalmond', 'wheat', 'cornsilk', 'lemonchiffon', 'lightgoldenrodyellow', 'lightyellow', 'saddlebrown', 'sienna', 'chocolate', 'peru', 'sandybrown', 'burlywood', 'tan', 'rosybrown', 'moccasin', 'navajowhite', 'peachpuff', 'mistyrose', 'lavenderblush', 'linen', 'oldlace', 'papayawhip', 'seashell', 'mintcream', 'slategray', 'lightslategray', 'lightsteelblue', 'lavender', 'floralwhite', 'aliceblue', 'ghostwhite', 'honeydew', 'ivory', 'azure', 'snow', 'black', 'dimgray', 'gray', 'darkgray', 'silver', 'lightgray', 'gainsboro', 'whitesmoke', 'white'].indexOf(color) !== -1;
}

function buildFilterString(filter: AbstractThumborFilterProp): string {
    let filterString = '';
    switch (filter.name) {
        case 'autojpg':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(filter.args[0].value === 'True' || filter.args[0].value === 'False') {
                    filterString += `(${filter.args[0].value})`;
                }
                else {
                    filterString += '()';
                }
            }
            else {
                filterString += '()';
            }
            break;
        case 'background_color':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'string') {
                    const isHexColourCode = (s: string) => !!s.match(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i)
                    if(isHexColourCode(filter.args[0].value)) {
                        filterString += `(${filter.args[0].value.substring(1)})`;
                    }
                    else if (filter.args[0].value === 'auto') {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else if(isHtmlColor(filter.args[0].value)) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;
        case 'blur':
            filterString += filter.name;
            if(filter.args && filter.args.length > 0 && filter.args.length < 3) {
                    if(typeof filter.args[0].value === 'number') {
                        if(filter.args[0].value >= 0 && filter.args[0].value <= 150) {
                            filterString += `(${filter.args[0].value}`;
                            if (filter.args.length === 2) {
                                if (typeof filter.args[1].value === 'number') {
                                    if(filter.args[1].value >= 0 && filter.args[1].value <= 150) {
                                        filterString += `,${filter.args[1].value}`;
                                    }
                                }
                            }
                            filterString += ')';
                        }
                        else {
                            filterString = '';
                        }
                    }
                    else {
                        filterString = '';
                    }
                }
            else {
                filterString = '';
            }
            break;
        case 'brightness':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= -100 && filter.args[0].value <= 100) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;
        case 'contrast':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= -100 && filter.args[0].value <= 100) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case 'convolution':
            filterString += filter.name;
            if(filter.args && filter.args.length === 3) {
                filterString+='(';
                try {
                    (filter.args[0].value as number[][]).forEach((array, index) => {
                        array.forEach((value, index2) => {
                            filterString += value + ';';
                        });
                    });
                    filterString = filterString.slice(0, -1);
                    filterString += ','+filter.args[1].value;
                    filterString += ','+(filter.args[2].value as boolean ? 'true' : 'false')+')';

                    //console.log('convolution filter: ', filterString);
                }
                catch {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case 'cover':
            filterString += filter.name+"()";
            break;

        case 'equalize':
            filterString += filter.name+"()";
            break;

        /*case 'extract_focal':
            filterString += filter.name;
            //TODO: Implement
            break;
        */
        case 'fill':
            filterString += filter.name;
            if(filter.args && filter.args.length > 0 && filter.args.length < 3) {
                if(typeof filter.args[0].value === 'string') {
                    const isHexColourCode = (s: string) => !!s.match(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i)
                    if(isHexColourCode(filter.args[0].value)) {
                        filterString += `(${filter.args[0].value.substring(1)}`;
                        if (filter.args.length === 2) {
                            if (typeof filter.args[1].value === 'number') {
                                if(filter.args[1].value === 0 || filter.args[1].value === 1) {
                                    filterString += `,${filter.args[1].value}`;
                                }
                            }
                            else if (typeof filter.args[1].value === 'boolean') {
                                filterString += `,${filter.args[1].value?'true':'false'}`;
                            }
                        }
                        filterString += ')';
                    }
                    else if (filter.args[0].value === 'auto') {
                        filterString += `(${filter.args[0].value}`;
                        if (filter.args.length === 2) {
                            if (typeof filter.args[1].value === 'number') {
                                if(filter.args[1].value === 0 || filter.args[1].value === 1) {
                                    filterString += `,${filter.args[1].value}`;
                                }
                            }
                            else if (typeof filter.args[1].value === 'boolean') {
                                filterString += `,${filter.args[1].value?'true':'false'}`;
                            }
                        }
                        filterString += ')';
                    }
                    else if (filter.args[0].value === 'blur') {
                        filterString += `(${filter.args[0].value}`;
                        if (filter.args.length === 2) {
                            if (typeof filter.args[1].value === 'number') {
                                if(filter.args[1].value === 0 || filter.args[1].value === 1) {
                                    filterString += `,${filter.args[1].value}`;
                                }
                            }
                            else if (typeof filter.args[1].value === 'boolean') {
                                filterString += `,${filter.args[1].value?'true':'false'}`;
                            }
                        }
                        filterString += ')';
                    }
                    else if (filter.args[0].value === 'transparent') {
                        filterString += `(${filter.args[0].value}`;
                        if (filter.args.length === 2) {
                            if (typeof filter.args[1].value === 'number') {
                                if(filter.args[1].value === 0 || filter.args[1].value === 1) {
                                    filterString += `,${filter.args[1].value}`;
                                }
                            }
                            else if (typeof filter.args[1].value === 'boolean') {
                                filterString += `,${filter.args[1].value?'true':'false'}`;
                            }
                        }
                        filterString += ')';
                    }
                    else if(isHtmlColor(filter.args[0].value)) {
                        filterString += `(${filter.args[0].value}`;
                        if (filter.args.length === 2) {
                            if (typeof filter.args[1].value === 'number') {
                                if(filter.args[1].value === 0 || filter.args[1].value === 1) {
                                    filterString += `,${filter.args[1].value}`;
                                }
                            }
                            else if (typeof filter.args[1].value === 'boolean') {
                                filterString += `,${filter.args[1].value?'true':'false'}`;
                            }
                        }
                        filterString += ')';
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case 'focal':
            filterString += filter.name+'(';
            if(filter.args && filter.args.length === 4) {
                for(let arg of filter.args) {
                    if(typeof arg.value !== 'number') {
                        filterString = '';
                        break;
                    }
                }
                if(filterString !== '') {
                    filterString += `${filter.args[0].value}x${filter.args[1].value}:${filter.args[2].value}x${filter.args[3].value})`;
                }
            }
            else {
                filterString = '';
            }
            break;

        case 'format':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                switch (filter.args[0].value) {
                    case 'jpeg':
                        filterString += `(${filter.args[0].value})`;
                        break;
                    case 'png':
                        filterString += `(${filter.args[0].value})`;
                        break;
                    case 'webp':
                        filterString += `(${filter.args[0].value})`;
                        break;
                    case 'gif':
                        filterString += `(${filter.args[0].value})`;
                        break;
                    case 'avif':
                        filterString += `(${filter.args[0].value})`;
                        break;
                    default:
                        filterString = '';
                        break;
                }
            }
            else {
                filterString = '';
            }
            break;

        case "grayscale":
            filterString += filter.name+'()';
            break;

        case 'max_bytes':
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= 1) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "no_upscale":
            filterString += filter.name+'()';
            break;

        case "noise":
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= 0 && filter.args[0].value <= 100) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "proportion":
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= 0.0 && filter.args[0].value <= 1.0) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "quality":
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= 0 && filter.args[0].value <= 100) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "rgb":
            filterString += filter.name+'(';
            if(filter.args && filter.args.length === 3) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= -100 && filter.args[0].value <= 100) {
                        filterString += `${filter.args[0].value}`;
                        if(typeof filter.args[1].value === 'number') {
                            if (filter.args[1].value >= -100 && filter.args[1].value <= 100) {
                                filterString += `,${filter.args[1].value}`;
                                if(typeof filter.args[2].value === 'number') {
                                    if (filter.args[2].value >= -100 && filter.args[2].value <= 100) {
                                        filterString += `,${filter.args[2].value})`;
                                    } else {
                                        filterString = '';
                                    }
                                }
                                else {
                                    filterString = '';
                                }
                            } else {
                                filterString = '';
                            }
                        }
                        else {
                            filterString = '';
                        }
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "rotate":
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= 0 && filter.args[0].value <= 359) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "round_corner":
            filterString += filter.name;
            //TODO: Implement
            break;

        case "saturation":
            filterString += filter.name;
            if(filter.args && filter.args.length === 1) {
                if(typeof filter.args[0].value === 'number') {
                    if(filter.args[0].value >= -100 && filter.args[0].value <= 100) {
                        filterString += `(${filter.args[0].value})`;
                    }
                    else {
                        filterString = '';
                    }
                }
                else {
                    filterString = '';
                }
            }
            else {
                filterString = '';
            }
            break;

        case "sharpen":
            filterString += filter.name;
            //TODO: Implement
            break;

        case "stretch":
            filterString += filter.name+'()';
            break;

        case "strip_exif":
            filterString += "strip\_exif"+'()';
            break;

        case "strip_icc":
            filterString += "strip\_icc"+'()';
            break;

        case "upscale":
            filterString += filter.name+'()';
            break;

        case "watermark":
            filterString += filter.name;
            //TODO: Implement
            break;
    }
    return filterString;
}

function buildFiltersString(filters: AbstractThumborFilterProp[]) : string {
    let filtersString = '/filters:';
    if(filters && filters.length > 0) {
        filters.forEach((filter, index) => {
            filtersString += buildFilterString(filter);
            if(index < filters.length - 1) {
                filtersString += ':';
            }
        });
    }
    return filtersString;
}

export function buildUrl(imageSrc: string, thumborProps: ThumborProps): URL {
    let url = `${thumborProps.url.toString()}`;
    url = url.endsWith("/") ? url.substring(0, url.length - 1) : url;

    let mainUrlPart = '';
    if(thumborProps.trim) {
        if(thumborProps.trim.trimMode === "auto") {
            mainUrlPart += `/trim`;
        }
        else {
            mainUrlPart += `/trim:${thumborProps.trim.trimMode}`;
        }
    }

    if(thumborProps.crop) {
        mainUrlPart += `/crop:${thumborProps.crop.topLeft.x}x${thumborProps.crop.topLeft.y}:${thumborProps.crop.bottomRight.x}x${thumborProps.crop.bottomRight.y}`;
    }

    if(thumborProps.fit) {
        if(thumborProps.fit === "fit-in") {
            mainUrlPart += `/fit-in`;
        }
        else if(thumborProps.fit === "adaptive-fit-in") {
            mainUrlPart += `/adaptive-fit-in`;
        }
        else if(thumborProps.fit === "full-fit-in") {
            mainUrlPart += `/full-fit-in`;
        }
    }

    if(thumborProps.flip) {
        if(thumborProps.flip.flipMode === "vertical") {
            if(thumborProps.width) {
                mainUrlPart += `/${thumborProps.width}x-0`;
            }
            else if(thumborProps.height) {
                mainUrlPart += `/0x-${thumborProps.height}`;
            }
            else if(thumborProps.width && thumborProps.height) {
                mainUrlPart += `/${thumborProps.width}x-${thumborProps.height}`;
            }
        }
        else if(thumborProps.flip.flipMode === "horizontal") {
            if(thumborProps.width) {
                mainUrlPart += `/-${thumborProps.width}x0`;
            }
            else if(thumborProps.height) {
                mainUrlPart += `/-0x${thumborProps.height}`;
            }
            else if(thumborProps.width && thumborProps.height) {
                mainUrlPart += `/-${thumborProps.width}x${thumborProps.height}`;
            }
        }
        else if(thumborProps.flip.flipMode === "both") {
            if(thumborProps.width) {
                mainUrlPart += `/-${thumborProps.width}x-0`;
            }
            else if(thumborProps.height) {
                mainUrlPart += `/-0x-${thumborProps.height}`;
            }
            else if(thumborProps.width && thumborProps.height) {
                mainUrlPart += `/-${thumborProps.width}x-${thumborProps.height}`;
            }
        }
    }
    else {
        if(thumborProps.width && thumborProps.height) {
            mainUrlPart += `/${thumborProps.width}x${thumborProps.height}`;
        }
        else if(thumborProps.width) {
            mainUrlPart += `/${thumborProps.width}x`;
        }
        else if(thumborProps.height) {
            mainUrlPart += `/x${thumborProps.height}`;
        }
    }

    if(thumborProps.horizontalAlignment) {
        mainUrlPart+=`/${thumborProps.horizontalAlignment}`;
    }
    if(thumborProps.verticalAlignment) {
        mainUrlPart+=`/${thumborProps.verticalAlignment}`;
    }

    if(thumborProps.smart) {
        mainUrlPart+=`/smart`;
    }

    if(thumborProps.filters && thumborProps.filters.length > 0) {
        mainUrlPart += buildFiltersString(thumborProps.filters);
    }
    mainUrlPart += `/${encodeURL(srcToUrl(imageSrc))}`;

    if(thumborProps.key && thumborProps.key.length > 0) {
        //console.log('to sign: ', mainUrlPart.substring(1, mainUrlPart.length));
        let key = HmacSHA1(mainUrlPart.substring(1, mainUrlPart.length), thumborProps.key);
        key = Base64.stringify(key);

        key = key.replace(/\+/g, '-').replace(/\//g, '_');

        url+=`/${key}${mainUrlPart}`;
    }
    else {
        url+=`/unsafe${mainUrlPart}`;
    }
    //console.log('url: ', url);
    return new URL(url);
}

export function buildBackgrounImageCssString(imageSrc: string, thumborProps: ThumborProps): string {
    let url = buildUrl(imageSrc, thumborProps);
    return `url('${url}')`;
}
