export type HtmlColor = 'maroon' | 'darkred' | 'brown' | 'firebrick' | 'crimson' | 'red' | 'tomato' | 'coral' | 'indianred' | 'lightcoral' | 'darksalmon' | 'salmon' | 'lightsalmon' | 'orangered' | 'darkorange' | 'orange' | 'gold' | 'darkgoldenrod' | 'goldenrod' | 'palegoldenrod' | 'darkkhaki' | 'khaki' | 'olive' | 'yellow' | 'yellowgreen' | 'darkolivegreen' | 'olivedrab' | 'lawngreen' | 'chartreuse' | 'greenyellow' | 'darkgreen' | 'green' | 'forestgreen' | 'lime' | 'limegreen' | 'lightgreen' | 'palegreen' | 'darkseagreen' | 'mediumspringgreen' | 'springgreen' | 'seagreen' | 'mediumaquamarine' | 'mediumseagreen' | 'lightseagreen' | 'darkslategray' | 'teal' | 'darkcyan' | 'aqua' | 'cyan' | 'lightcyan' | 'darkturquoise' | 'turquoise' | 'mediumturquoise' | 'paleturquoise' | 'aquamarine' | 'powderblue' | 'cadetblue' | 'steelblue' | 'cornflowerblue' | 'deepskyblue' | 'dodgerblue' | 'lightblue' | 'skyblue' | 'lightskyblue' | 'midnightblue' | 'navy' | 'darkblue' | 'mediumblue' | 'blue' | 'royalblue' | 'blueviolet' | 'indigo' | 'darkslateblue' | 'slateblue' | 'mediumslateblue' | 'mediumpurple' | 'darkmagenta' | 'darkviolet' | 'darkorchid' | 'mediumorchid' | 'purple' | 'thistle' | 'plum' | 'violet' | 'fuchsia' | 'orchid' | 'mediumvioletred' | 'palevioletred' | 'deeppink' | 'hotpink' | 'lightpink' | 'pink' | 'antiquewhite' | 'beige' | 'bisque' | 'blanchedalmond' | 'wheat' | 'cornsilk' | 'lemonchiffon' | 'lightgoldenrodyellow' | 'lightyellow' | 'saddlebrown' | 'sienna' | 'chocolate' | 'peru' | 'sandybrown' | 'burlywood' | 'tan' | 'rosybrown' | 'moccasin' | 'navajowhite' | 'peachpuff' | 'mistyrose' | 'lavenderblush' | 'linen' | 'oldlace' | 'papayawhip' | 'seashell' | 'mintcream' | 'slategray' | 'lightslategray' | 'lightsteelblue' | 'lavender' | 'floralwhite' | 'aliceblue' | 'ghostwhite' | 'honeydew' | 'ivory' | 'azure' | 'snow' | 'black' | 'dimgray' | 'gray' | 'darkgray' | 'silver' | 'lightgray' | 'gainsboro' | 'whitesmoke' | 'white';
export type Color = string | HtmlColor;
export type AutoColor = Color | 'auto';
export type BlurColor = Color | 'blur';
export type TransparentColor = Color | 'transparent';
export type AutoBlurColor = AutoColor | BlurColor;
export type AutoBlurTransparentColor = AutoBlurColor | TransparentColor | BlurColor;

export interface ABProp {
    a?: number;
    b?: number;
}

export interface AbstractThumborFilterArgumentProp {
    value: URL |
        'webp' |
        'jpeg' |
        'gif' |
        'png' |
        'avif' |
        boolean |
        Color |
        AutoColor |
        BlurColor |
        TransparentColor |
        AutoBlurColor |
        AutoBlurTransparentColor |
        string |
        number |
        number[][] |
        never |
        'none' |
        ABProp |
        1 |
        0 |
        'True' |
        'False';
}

export interface NeverThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: never;
}
export interface ColorThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: Color;
}

export interface AutoColorThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: AutoColor;
}

export interface BlurColorThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: BlurColor;
}

export interface AutoBlurTransparentBooleanColorThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: AutoBlurTransparentColor | boolean;
}

export interface NumberThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: number;
}

export interface BooleanThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: boolean;
}

export interface FormatThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: 'webp' |
        'jpeg' |
        'gif' |
        'png' |
        'avif';
}

export interface NumberBooleanThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: number | boolean;
}

export interface NumberNoneUrlThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: number | 'none' | URL | string;
}

export interface ABBinaryNumberThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: ABProp | 0 | 1 | number;
}

export interface NumberBooleanMatrixThumborFilterArgumentProp extends AbstractThumborFilterArgumentProp {
    value: number | boolean | number[][];
}

export interface AbstractThumborFilterProp {
    name: 'autojpg' |
        'background_color' |
        'blur' |
        'brightness' |
        'contrast' |
        'convolution' |
        'cover' |
        'equalize' |
        //'extract_focal' |
        'fill' |
        'focal' |
        'format' |
        'grayscale' |
        'max_bytes' |
        'noise' |
        'no_upscale' |
        'proportion' |
        'quality' |
        'rgb' |
        'rotate' |
        'round_corner' |
        'saturation' |
        'sharpen' |
        'stretch' |
        'strip_exif' |
        'strip_icc' |
        'upscale' |
        'watermark';
    args: AbstractThumborFilterArgumentProp[];
}

export interface AutoJPGThumborFilterProp extends AbstractThumborFilterProp {
    name: 'autojpg';
    args: NeverThumborFilterArgumentProp[];
}

export interface BackgroundThumborFilterProp extends AbstractThumborFilterProp {
    name: 'background_color';
    args: AutoColorThumborFilterArgumentProp[];
}

export interface BlurThumborFilterProp extends AbstractThumborFilterProp {
    name: 'blur';
    args: NumberThumborFilterArgumentProp[];
}

export interface BrightnessThumborFilterProp extends AbstractThumborFilterProp {
    name: 'brightness';
    args: NumberThumborFilterArgumentProp[];
}

export interface ContrastThumborFilterProp extends AbstractThumborFilterProp {
    name: 'contrast';
    args: NumberThumborFilterArgumentProp[];
}

export interface ConvolutionThumborFilterProp extends AbstractThumborFilterProp {
    name: 'convolution';
    args: NumberBooleanMatrixThumborFilterArgumentProp[];
}

export interface CoverThumborFilterProp extends AbstractThumborFilterProp {
    name: 'cover';
    args: NeverThumborFilterArgumentProp[];
}

export interface EqualizeThumborFilterProp extends AbstractThumborFilterProp {
    name: 'equalize';
    args: NeverThumborFilterArgumentProp[];
}

/*export interface ExtractFocalThumborFilterProp extends AbstractThumborFilterProp {
    name: 'extract_focal';
    args: NeverThumborFilterArgumentProp[];
}*/

export interface FillingThumborFilterProp extends AbstractThumborFilterProp {
    name: 'fill';
    args: AutoBlurTransparentBooleanColorThumborFilterArgumentProp[];
}

export interface FocalThumborFilterProp extends AbstractThumborFilterProp {
    name: 'focal';
    args: NumberThumborFilterArgumentProp[];
}

export interface FormatThumborFilterProp extends AbstractThumborFilterProp {
    name: 'format';
    args: FormatThumborFilterArgumentProp[];
}

export interface GrayscaleThumborFilterProp extends AbstractThumborFilterProp {
    name: 'grayscale';
    args: NeverThumborFilterArgumentProp[];
}

export interface MaxBytesThumborFilterProp extends AbstractThumborFilterProp {
    name: 'max_bytes';
    args: NumberThumborFilterArgumentProp[];
}

export interface NoUpscaleThumborFilterProp extends AbstractThumborFilterProp {
    name: 'no_upscale';
    args: NeverThumborFilterArgumentProp[];
}

export interface NoiseThumborFilterProp extends AbstractThumborFilterProp {
    name: 'noise';
    args: NumberThumborFilterArgumentProp[];
}

export interface ProportionThumborFilterProp extends AbstractThumborFilterProp {
    name: 'proportion';
    args: NumberThumborFilterArgumentProp[];
}

export interface QualityThumborFilterProp extends AbstractThumborFilterProp {
    name: 'quality';
    args: NumberThumborFilterArgumentProp[];
}

export interface RGBThumborFilterProp extends AbstractThumborFilterProp {
    name: 'rgb';
    args: NumberThumborFilterArgumentProp[];
}

export interface RotateThumborFilterProp extends AbstractThumborFilterProp {
    name: 'rotate';
    args: NumberThumborFilterArgumentProp[];
}

export interface RoundCornersThumborFilterProp extends AbstractThumborFilterProp {
    name: 'round_corner';
    args: ABBinaryNumberThumborFilterArgumentProp[];
}

export interface SaturationThumborFilterProp extends AbstractThumborFilterProp {
    name: 'saturation';
    args: NumberThumborFilterArgumentProp[];
}

export interface SharpenThumborFilterProp extends AbstractThumborFilterProp {
    name: 'sharpen';
    args: NumberBooleanThumborFilterArgumentProp[];
}

export interface StretchThumborFilterProp extends AbstractThumborFilterProp {
    name: 'stretch';
    args: NeverThumborFilterArgumentProp[];
}

export interface StripEXIFThumborFilterProp extends AbstractThumborFilterProp {
    name: 'strip_exif';
    args: NeverThumborFilterArgumentProp[];
}

export interface StripICCThumborFilterProp extends AbstractThumborFilterProp {
    name: 'strip_icc';
    args: NeverThumborFilterArgumentProp[];
}

export interface UpscaleThumborFilterProp extends AbstractThumborFilterProp {
    name: 'upscale';
    args: NeverThumborFilterArgumentProp[];
}
//TODO: add other such as center or repeat
export interface WatermarkThumborFilterProp extends AbstractThumborFilterProp {
    name: 'upscale';
    args: NumberNoneUrlThumborFilterArgumentProp[];
}
