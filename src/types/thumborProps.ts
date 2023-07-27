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

export interface ThumborCropProps {
    topLeft: ThumborPointProps;
    bottomRight: ThumborPointProps;
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
const isHexColourCode = (s: string) => !!s.match(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i)

function isEncoded(str: string) {
    return typeof str == "string" && decodeURIComponent(str) !== str;
}

type FilterPreprocessorResult = {
    filterString: string,
    extractionProps?: ThumborCropProps
};

//BLUR NOT WORKING ??
function buildFilterString(filter: AbstractThumborFilterProp): FilterPreprocessorResult {
    let filterString = '';
    let extractionProps: ThumborCropProps | null = null;
    switch (filter.name) {
        case 'autojpg':
            filterString += filter.name+'()';
            break;
        case 'background_color':
            if(!isHexColourCode(filter.color) && filter.color !== 'auto' && !isHtmlColor(filter.color)) {
                filter.color = 'auto';
            }
            else if(isHexColourCode(filter.color)) {
                filter.color = filter.color.replace('#', '');
            }
            filterString += filter.name+'('+filter.color+')';
            break;
        case 'blur':
            if(filter.radius < 0) {
                filter.radius = 0;
            }
            else if(filter.radius > 150) {
                filter.radius = 150;
            }

            if(filter.sigma < 0) {
                filter.sigma = 0;
            }
            else if(filter.sigma > 150) {
                filter.sigma = 150;
            }

            filterString += filter.name + '('+filter.radius+(filter.sigma ? ','+filter.sigma : '')+')';
            break;
        case 'brightness':
            filterString += filter.name;
            if(filter.amount < -100) {
                filter.amount = -100;
            }
            else if(filter.amount > 100) {
                filter.amount = 100;
            }
            filterString += '('+filter.amount+')';
            break;
        case 'contrast':
            filterString += filter.name;
            if(filter.amount < -100) {
                filter.amount = -100;
            }
            else if(filter.amount > 100) {
                filter.amount = 100;
            }
            filterString += '('+filter.amount+')';
            break;

        case 'convolution':
            filterString += filter.name+='(';
            filter.matrix.forEach((array) => {
                array.forEach((value) => {
                    filterString += value + ';';
                });
            });
            filterString = filterString.slice(0, -1);
            filterString += ','+filter.columns;
            filterString += ','+(filter.normalize ? 'true' : 'false')+')';
            break;

        case 'cover':
            filterString += filter.name+"()";
            break;

        case 'equalize':
            filterString += filter.name+"()";
            break;

        case 'extract_focal':
            filterString += filter.name+'()';
            extractionProps = filter.pre;
            break;

        case 'fill':
            if(!isHexColourCode(filter.color) && filter.color !== 'auto' && !isHtmlColor(filter.color) && filter.color !== 'blur' && filter.color !== 'transparent') {
                filter.color = 'auto';
            }
            else if(isHexColourCode(filter.color)) {
                filter.color = filter.color.replace('#', '');
            }
            filterString += filter.name+'('+filter.color+(filter.fillTransparent ? ',true' : '')+')';
            break;

        case 'focal':
            filterString += filter.name+`(${filter.left}x${filter.top}:${filter.right}x${filter.bottom})`;
            break;

        case 'format':
            filterString += filter.name + `(${filter.format})`;
            break;

        case "grayscale":
            filterString += filter.name+'()';
            break;

        case 'max_bytes':
            filterString += filter.name+'('+filter.bytes+')';
            break;

        case "no_upscale":
            filterString += filter.name+'()';
            break;

        case "noise":
            if(filter.amount < 0) {
                filter.amount = 0;
            }
            else if(filter.amount > 100) {
                filter.amount = 100;
            }
            filterString += filter.name+`(${filter.amount})`;
            break;

        case "proportion":
            if(filter.percentage < 0.0) {
                filter.percentage = 0.0;
            }
            else if(filter.percentage > 1.0) {
                filter.percentage = 1.0;
            }
            filterString += filter.name+`(${filter.percentage})`;
            break;

        case "quality":
            if(filter.amount < 0) {
                filter.amount = 0;
            }
            else if(filter.amount > 100) {
                filter.amount = 100;
            }

            filterString += filter.name+`(${filter.amount})`;
            break;

        case "rgb":
            if(filter.red < -100) {
                filter.red = -100;
            }
            else if(filter.red > 100) {
                filter.red = 100;
            }

            if(filter.green < -100) {
                filter.green = -100;
            }
            else if(filter.green > 100) {
                filter.green = 100;
            }

            if(filter.blue < -100) {
                filter.blue = -100;
            }
            else if(filter.blue > 100) {
                filter.blue = 100;
            }

            filterString += filter.name+`(${filter.red},${filter.green},${filter.blue})`;
            break;

        case "rotate":
            if(filter.angle < 0) {
                filter.angle = 0;
            }
            else if(filter.angle > 359) {
                filter.angle = 359;
            }
            filterString += filter.name+`(${filter.angle})`;
            break;

        case "round_corner":
            if(filter.red < 0) {
                filter.red = 0;
            }
            else if(filter.red > 255) {
                filter.red = 255;
            }

            if(filter.green < 0) {
                filter.green = 0;
            }
            else if(filter.green > 255) {
                filter.green = 255;
            }

            if(filter.blue < 0) {
                filter.blue = 0;
            }
            else if(filter.blue > 255) {
                filter.blue = 255;
            }

            filterString += filter.name+`(${filter.a}`;
            if(filter.b) {
                filterString += `|${filter.b}`;
            }
            filterString += `,${filter.red},${filter.green},${filter.blue}`;
            if(filter.transparent) {
                filterString += `,true`;
            }
            filterString += `)`;
            break;

        case "saturation":
            filterString += filter.name+`(${filter.amount})`;
            break;

        case "sharpen":
            filterString += filter.name+`(${filter.amount},${filter.radius},${filter.luminance? 'true': 'false'})`;
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
            if(!isEncoded(filter.url)) {
                filter.url = encodeURIComponent(filter.url);
            }
            filterString += filter.name+`(${filter.url},`;
            switch (filter.xPosition.type) {
                case 'number':
                    filterString += `${filter.xPosition.value},`;
                    break;
                case 'percentage':
                    filterString += `${filter.xPosition.value}p,`;
                    break;
                case 'center':
                    filterString += `center,`;
                    break;
                case 'repeat':
                    filterString += `repeat,`;
                    break;
            }
            switch (filter.yPosition.type) {
                case 'number':
                    filterString += `${filter.yPosition.value},`;
                    break;
                case 'percentage':
                    filterString += `${filter.yPosition.value}p,`;
                    break;
                case 'center':
                    filterString += `center,`;
                    break;
                case 'repeat':
                    filterString += `repeat,`;
                    break;
            }
            if(filter.alpha < 0) {
                filter.alpha = 0;
            }
            else if(filter.alpha > 100) {
                filter.alpha = 100;
            }
            filterString += `${filter.alpha}${filter.wRatio? ','+filter.wRatio : ''}${filter.hRatio ? ','+filter.hRatio : ''})`;
            break;
    }
    return extractionProps ? {
        filterString,
        extractionProps
    } : {
        filterString
    };
}

function buildFiltersString(filters: AbstractThumborFilterProp[]) : FilterPreprocessorResult {
    let filtersString = '/filters:';
    let extractionProps: ThumborCropProps | null = null;
    if(filters && filters.length > 0) {
        filters.forEach((filter, index) => {
            let result = buildFilterString(filter);
            filtersString += result.filterString;
            if(filter.name === 'extract_focal' && result.extractionProps) {
                extractionProps = result.extractionProps;
            }
            if(index < filters.length - 1) {
                filtersString += ':';
            }
        });
    }
    return extractionProps ? {
        filterString: filtersString,
        extractionProps
    } : {
        filterString: filtersString
    };
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
        mainUrlPart += `/${thumborProps.crop.topLeft.x}x${thumborProps.crop.topLeft.y}:${thumborProps.crop.bottomRight.x}x${thumborProps.crop.bottomRight.y}`;
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
        let sortedFilters = [
            ...thumborProps.filters.filter(({name}) => name !== 'extract_focal'),
            ...thumborProps.filters.filter(({name}) => name === 'extract_focal')
        ];
        console.log('sortedFilters: ', sortedFilters)
        let result = buildFiltersString(sortedFilters);
        console.log('result: ', result)
        mainUrlPart += result.filterString;;
        console.log('mainUrlPart after filters: ', mainUrlPart)
        if(result.extractionProps) {
            let cropPart = `${url.replace(/(^\w+:|^)\/\//, '')}`;
            let cropMainPart = `/${result.extractionProps.topLeft.x}x${result.extractionProps.topLeft.y}:${result.extractionProps.bottomRight.x}x${result.extractionProps.bottomRight.y}`;
            cropMainPart += '/' + encodeURL(srcToUrl(imageSrc));
            console.log('cropMainPart: ', cropMainPart)
            console.log('cropPart: ', cropPart)
            if(thumborProps.key && thumborProps.key.length > 0) {
                //console.log('to sign: ', mainUrlPart.substring(1, mainUrlPart.length));
                let key = HmacSHA1(cropMainPart.substring(1, cropMainPart.length), thumborProps.key);
                key = Base64.stringify(key);

                key = key.replace(/\+/g, '-').replace(/\//g, '_');

                cropPart+=`/${key}${cropMainPart}`;
            }
            else {
                cropPart+=`/unsafe${cropMainPart}`;
            }
            mainUrlPart += `/`+encodeURIComponent(cropPart);
            console.log('mainUrlPart after extraction focal crop: ', mainUrlPart)
        }
        else {
            mainUrlPart += `/${encodeURL(srcToUrl(imageSrc))}`;
        }
        console.log('mainUrlPart after adding source: ', mainUrlPart)
    }
    else {
        mainUrlPart += `/${encodeURL(srcToUrl(imageSrc))}`;
    }

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
    console.log('url: ', url);
    return new URL(url);
}
