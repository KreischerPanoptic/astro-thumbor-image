import type {ThumborCropProps} from "./thumborProps";

export type HtmlColor = 'maroon' | 'darkred' | 'brown' | 'firebrick' | 'crimson' | 'red' | 'tomato' | 'coral' | 'indianred' | 'lightcoral' | 'darksalmon' | 'salmon' | 'lightsalmon' | 'orangered' | 'darkorange' | 'orange' | 'gold' | 'darkgoldenrod' | 'goldenrod' | 'palegoldenrod' | 'darkkhaki' | 'khaki' | 'olive' | 'yellow' | 'yellowgreen' | 'darkolivegreen' | 'olivedrab' | 'lawngreen' | 'chartreuse' | 'greenyellow' | 'darkgreen' | 'green' | 'forestgreen' | 'lime' | 'limegreen' | 'lightgreen' | 'palegreen' | 'darkseagreen' | 'mediumspringgreen' | 'springgreen' | 'seagreen' | 'mediumaquamarine' | 'mediumseagreen' | 'lightseagreen' | 'darkslategray' | 'teal' | 'darkcyan' | 'aqua' | 'cyan' | 'lightcyan' | 'darkturquoise' | 'turquoise' | 'mediumturquoise' | 'paleturquoise' | 'aquamarine' | 'powderblue' | 'cadetblue' | 'steelblue' | 'cornflowerblue' | 'deepskyblue' | 'dodgerblue' | 'lightblue' | 'skyblue' | 'lightskyblue' | 'midnightblue' | 'navy' | 'darkblue' | 'mediumblue' | 'blue' | 'royalblue' | 'blueviolet' | 'indigo' | 'darkslateblue' | 'slateblue' | 'mediumslateblue' | 'mediumpurple' | 'darkmagenta' | 'darkviolet' | 'darkorchid' | 'mediumorchid' | 'purple' | 'thistle' | 'plum' | 'violet' | 'fuchsia' | 'orchid' | 'mediumvioletred' | 'palevioletred' | 'deeppink' | 'hotpink' | 'lightpink' | 'pink' | 'antiquewhite' | 'beige' | 'bisque' | 'blanchedalmond' | 'wheat' | 'cornsilk' | 'lemonchiffon' | 'lightgoldenrodyellow' | 'lightyellow' | 'saddlebrown' | 'sienna' | 'chocolate' | 'peru' | 'sandybrown' | 'burlywood' | 'tan' | 'rosybrown' | 'moccasin' | 'navajowhite' | 'peachpuff' | 'mistyrose' | 'lavenderblush' | 'linen' | 'oldlace' | 'papayawhip' | 'seashell' | 'mintcream' | 'slategray' | 'lightslategray' | 'lightsteelblue' | 'lavender' | 'floralwhite' | 'aliceblue' | 'ghostwhite' | 'honeydew' | 'ivory' | 'azure' | 'snow' | 'black' | 'dimgray' | 'gray' | 'darkgray' | 'silver' | 'lightgray' | 'gainsboro' | 'whitesmoke' | 'white';
export type Color = string | HtmlColor;
export type AutoColor = Color | 'auto';
export type BlurColor = Color | 'blur';
export type TransparentColor = Color | 'transparent';
export type AutoBlurColor = AutoColor | BlurColor;
export type AutoBlurTransparentColor = AutoBlurColor | TransparentColor | BlurColor;

type WatermarkPosition = {

} & ({
    type: 'number' | 'percentage',
    value: number
} | {
    type: 'center' | 'repeat'
})

export type AbstractThumborFilterProp = {

} & ({
    name: 'autojpg'
} | {
    name: 'background_color',
    color: AutoBlurColor
} | {
    name: 'blur',
    radius: number,
    sigma?: number
} | {
    name: 'brightness',
    amount: number
} | {
    name: 'contrast',
    amount: number
} | {
    name: 'convolution',
    matrix: number[][],
    columns: number,
    normalize: boolean
} | {
    name: 'cover',
} | {
    name: 'equalize',
} | {
    name: 'extract_focal',
    pre: ThumborCropProps
} | {
    name: 'fill',
    color: AutoBlurTransparentColor,
    fillTransparent?: boolean
} | {
    name: 'focal',
    left: number,
    top: number,
    right: number,
    bottom: number
} | {
    name: 'format',
    format: 'webp' | 'jpeg' | 'gif' | 'png' | 'avif' | 'heic'
} | {
    name: 'grayscale'
} | {
    name: 'max_bytes',
    bytes: number
} | {
    name: 'no_upscale'
} | {
    name: 'noise',
    amount: number
} | {
    name: 'proportion',
    percentage: number
} | {
    name: 'quality',
    amount: number
} | {
    name: 'rgb',
    red: number,
    green: number,
    blue: number
} | {
    name: 'rotate',
    angle: number
} | {
    name: 'round_corner',
    a: number,
    b?: number,
    red: number,
    green: number,
    blue: number,
    transparent? : boolean
} | {
    name: 'saturation',
    amount: number
} | {
    name: 'sharpen',
    amount: number,
    radius: number,
    luminance: boolean
} | {
    name: 'stretch'
} | {
    name: 'strip_exif'
} | {
    name: 'strip_icc'
} | {
    name: 'upscale'
} | {
    name: 'watermark',
    url: string,
    xPosition: WatermarkPosition,
    yPosition: WatermarkPosition,
    alpha: number,
    wRatio?: number | 'none',
    hRatio?: number | 'none',
})
