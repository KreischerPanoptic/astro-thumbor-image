![Astro Thumbor Image Logo](https://raw.githubusercontent.com/KreischerPanoptic/astro-thumbor-image/6684fb1d849069c8567dda1cc56937e36bd2c5f2/docs/images/astro-thumbor-image-logo.png)

# 🚀 Astro Thumbor Image

This [Astro](https://astro.build/) component makes it easy to add images which uses [Thumbor](https://www.thumbor.org) as engine for optimization.

Pull requests and/or feature requests are very welcome!

## Installation

To install Astro Thumbor Image, run the following command in your terminal:

```bash
npm install astro-thumbor-image
```

or if you use yarn:
  
```bash
yarn add astro-thumbor-image
```

## How To Use

In any of your Astro pages, import any suitable Astro Thumbor Image and then use the component inside
the `<head>` section of your HTML:

```astro
---
import { ThumborImage } from "astro-thumbor-image";
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Thumbor Image</title>
  </head>
  <body>
    <div>
    <p>
        This is a test of the Thumbor Image component. Local image:
    </p>
    <ThumborImage
        thumbor={{
          url: new URL('http://thumbor.thumborize.globo.com'),
          width: 500,
          height: 500,
          smart: true,
          filters: [
            {
              name: 'quality',
              amount: 100
            },
            {
              name: 'strip_exif'
            },
            {
              name: "round_corner",
              a: 25,
              red: 255,
              green: 255,
              blue: 255,
              transparent: true
            },
            {
              name: 'strip_icc'
            },
            {
              name: 'format',
              format: 'webp'
            },
            {
              name:'background_color',
              color: '#2bb9a4'
            },
            {
              name: "sharpen",
              amount: 2,
              radius: 1.0,
              luminance: true
            },
            {
              name:'extract_focal',
              pre: {
                topLeft: {
                  x: 100,
                  y: 150
                },
                bottomRight: {
                  x: 300,
                  y: 200
                }
              }
            },
            /*{
              name:'convolution',
              matrix: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
              columns: 3,
              normalize: false
            }*/
          ]
        }}
        src="https://raw.githubusercontent.com/thumbor/thumbor/master/docs/images/tom_before_brightness.jpg"
        alt="This is a test of the Thumbor Image component. Local logo image"
        />
      </div>
  </body>
</html>
```

## WARNING
This components is still in development. ```<ThumborOptimizedImage/>``` and ```<ThumborFallbackImage/>``` are proven to not work in
```ReactJS``` component with child nodes scenario, due to scripts not being loaded. This is a known issue and will be fixed in the future (I will probably just create react-thumbor-image or something like that).

## What's new in version 2.0.0?
More strict filter system. More reliable and easy to use with typescript type-checking.
Added missing filters, such as extract_focal, round_corner, sharpen and...watermark!

## Available Components
Component | Props Type | Description
------------ |---------| -------------
```<ThumborImage/>``` | ImageProps | The main component. Use this to add images to your page and set Thumbor options for transformations and optimization of image loading.
```<ThumborPicture/>``` | PictureProps | Use this component to add responsive images to your page.
```<ThumborFallbackImage/>``` | FallbackImageProps | Use this component to add an image with a fallback image option to your page. Fallback image also supports Thumbor on a fallback image source.
```<ThumborOptimizedImage/>``` | OptimizedImageProps | Use this component to add an image with a fallback image and low-res image options to your page. Fallback and low-res images also supports Thumbor on a fallback image source.

## Available Filters
Filter | Supported | Description
-------------- | -- | --------------------
```autojpg``` | ✅ | This filter overrides AUTO_PNG_TO_JPG config variable. [Learn more.](https://thumbor.readthedocs.io/en/latest/autojpg.html)
```background_color``` | ✅ | The background_color filter sets the background layer to the specified color. This is specifically useful when converting transparent images (PNG) to JPEG. [Learn more.](https://thumbor.readthedocs.io/en/latest/background_color.html)
```blur``` | ✅ | This filter applies a gaussian blur to the image. [Learn more.](https://thumbor.readthedocs.io/en/latest/blur.html)
```brightness``` | ✅ | This filter increases or decreases the image brightness. [Learn more.](https://thumbor.readthedocs.io/en/latest/brightness.html)
```contrast``` | ✅ | This filter increases or decreases the image contrast. [Learn more.](https://thumbor.readthedocs.io/en/latest/contrast.html)
```convolution``` | ✅ | This filter runs a convolution matrix (or kernel) on the image. See [Kernel (image processing)](http://en.wikipedia.org/wiki/Kernel_(image_processing)) for details on the process. Edge pixels are always extended outside the image area. [Learn more.](https://thumbor.readthedocs.io/en/latest/convolution.html)
```cover``` | ✅ | This filter is used in GIFs to extract their first frame as the image to be used as cover. [Learn more.](https://thumbor.readthedocs.io/en/latest/cover.html)
```equalize``` | ✅ | This filter equalizes the color distribution in the image. [Learn more.](https://thumbor.readthedocs.io/en/latest/equalize.html)
```extract_focal``` | ✅ | When cropping, thumbor uses focal points in the image to direct the area of the image that matters most. There are several ways of finding focal points. [Learn more.](https://thumbor.readthedocs.io/en/latest/extract_focal_points.html)
```fill``` | ✅ | This filter returns an image sized exactly as requested independently of its ratio. It will fill the missing area with the specified color. It is usually combined with the “fit-in” or “adaptive-fit-in” options. [Learn more.](https://thumbor.readthedocs.io/en/latest/filling.html)
```focal``` | ✅ | This filter adds a focal point, which is used in later transforms. [Learn more.](https://thumbor.readthedocs.io/en/latest/focal.html)
```format``` | ✅ | This filter specifies the output format of the image. The output must be one of: “webp”, “jpeg”, “gif”, “png”, or “avif”. [Learn more.](https://thumbor.readthedocs.io/en/latest/format.html)
```grayscale``` | ✅ | This filter changes the image to grayscale. [Learn more.](https://thumbor.readthedocs.io/en/latest/grayscale.html)
```max_bytes``` | ✅ | This filter automatically degrades the quality of the image until the image is under the specified amount of bytes. [Learn more.](https://thumbor.readthedocs.io/en/latest/max_bytes.html)
```no_upscale``` | ✅ | This filter tells thumbor not to upscale your images. [Learn more.](https://thumbor.readthedocs.io/en/latest/no_upscale.html)
```noise``` | ✅ | This filter adds noise to the image. [Learn more.](https://thumbor.readthedocs.io/en/latest/noise.html)
```proportion``` | ✅ | This filter applies the specified porportion to the image’s height and width when cropping. [Learn more.](https://thumbor.readthedocs.io/en/latest/proportion.html)
```quality``` | ✅ | This filter changes the overall quality of the JPEG image (does nothing for PNGs or GIFs). [Learn more.](https://thumbor.readthedocs.io/en/latest/quality.html)
```Red eye``` | ❌ | Not documented yet. (Can't implement in URL builder something that don't have any documentation) [Learn more.](https://thumbor.readthedocs.io/en/latest/red_eye.html)
```rgb``` | ✅ | This filter changes the amount of color in each of the three channels. [Learn more.](https://thumbor.readthedocs.io/en/latest/rgb.html)
```rotate``` | ✅ | This filter rotates the given image according to the angle value passed. [Learn more.](https://thumbor.readthedocs.io/en/latest/rotate.html)
```round_corner``` | ✅ | This filter adds rounded corners to the image using the specified color as background. [Learn more.](https://thumbor.readthedocs.io/en/latest/round_corners.html)
```saturation``` | ✅ | This filter increases or decreases the image saturation. [Learn more.](https://thumbor.readthedocs.io/en/latest/saturation.html)
```sharpen``` | ✅ | This filter enhances apparent sharpness of the image. It’s heavily based on Marco Rossini’s excellent Wavelet sharpen GIMP plugin. [Learn more.](https://thumbor.readthedocs.io/en/latest/sharpen.html)
```stretch``` | ✅ | This filter stretches the image until it fits the required width and height, instead of cropping the image. [Learn more.](https://thumbor.readthedocs.io/en/latest/stretch.html)
```strip_exif``` | ✅ | This filter removes any Exif information in the resulting image. [Learn more.](https://thumbor.readthedocs.io/en/latest/strip_exif.html)
```strip_icc``` | ✅ | This filter removes any ICC information in the resulting image. Even though the image might be smaller, removing ICC information may result in loss of quality. [Learn more.](https://thumbor.readthedocs.io/en/latest/strip_icc.html)
```upscale``` | ✅ | This filter tells thumbor to upscale your images. This only makes sense with “fit-in” or “adaptive-fit-in”. [Learn more.](https://thumbor.readthedocs.io/en/latest/upscale.html)
```watermark``` | ✅ | This filter adds a watermark to the image. It can be positioned inside the image with the alpha channel specified and optionally resized based on the image size by specifying the ratio (see [Resizing](https://thumbor.readthedocs.io/en/latest/watermark.html#resizing)). [Learn more.](https://thumbor.readthedocs.io/en/latest/watermark.html)

## ```<ThumborImage/>``` Props ```ImageProps```
 Propname             | Type                       | Description
----------------------|----------------------------| -------------
 thumbor?             | ThumborProps               | (optional) Thumbor configuration. If null, raw image src will be used.
 alt                  | string                     | (mandatory, for the sake of SEO) The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).
 src                  | string                     | (mandatory) The URL of the image. Only absolute URLs are supported. Relative URLs are not supported.
 height?              | string                     | (optional) The height of the image. Passed into the `height` attribute of the `<img>` tag as is.
 width?               | string                     | (optional) The width of the image. Passed into the `width` attribute of the `<img>` tag as is.
decoding? | "sync" \| "async" \| "auto" | (optional) The decoding attribute hints the browser about how the image should be decoded. This attribute is only supported by Chrome and Firefox. [Learn more.](https://web.dev/decoding-attribute/)
loading? | "lazy" \| "eager" | (optional) The loading attribute hints the browser about the loading strategy for the image. [Learn more.](https://web.dev/browser-level-image-lazy-loading/)        
srcset? | SetProps | (optional) The srcset attribute specifies the URL of the image to use in different situations. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
class? | string | (optional) The class attribute specifies one or more classnames for an element. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)

## ```<ThumborPicture/>``` Props ```PictureProps```
 Propname             | Type                       | Description
----------------------|----------------------------| -------------
image | ImageProps | (mandatory) The main image component.
sources | PictureSourceProps[] | (mandatory) An array of ```PictureSourceProps``` components.
class? | string | (optional) The class attribute specifies one or more classnames for an element. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)

## ```<ThumborFallbackImage/>``` Props ```FallbackImageProps extends ImageProps```
 Propname             | Type                       | Description
----------------------|----------------------------| -------------
fallback? | ImageProps | (optional) The fallback image component.
id | string | (mandatory) The id attribute specifies a unique id for an HTML element. Used in script for tracking state of image loading in selected ```<img/>``` element. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)

## ```<ThumborOptimizedImage/>``` Props ```OptimizedImageProps extends FallbackImageProps```
 Propname             | Type                       | Description
----------------------|----------------------------| -------------
lowres? | ImageProps | (optional) The low-res image component.

## ```PictureSourceProps``` Props
 Propname | Type                                                                                                           | Description
----------|----------------------------------------------------------------------------------------------------------------| -------------
 srcset   | SetProps                                                                                                       | (mandatory) The srcset attribute specifies the URL of the image to use in different situations. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
 media?   | string                                                                                                         | (optional) The media attribute specifies a media condition (similar to a media query) that the user agent will evaluate for the current document. If the specified condition is true, the browser will load the specified CSS file. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-media)
 type? | 'image/apng' \| 'image/avif' \| 'image/gif' \| 'image/jpeg' \| 'image/png' \| 'image/svg+xml' \| 'image/webp' | (optional) The type attribute specifies the MIME type of the image resource. [Learn more.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-type) 

## ```SetProps``` Props
 Propname             | Type                     | Description
----------------------|--------------------------| -------------
thumbor? | ThumborProps             | (optional) Thumbor configuration. If null, raw image src will be used.
src | string                   | (mandatory) The URL of the image. Only absolute URLs are supported. Relative URLs are not supported.
size? | number                   | (optional) The size attribute specifies the size of the linked resource. Used for constructing srcset string. 
mode? | "width" \| "resolution" | (optional) The mode attribute specifies the media query mode. ```width``` will result in ```w``` postfix. ```resolution``` will result in ```x``` prefix. Used for constructing srcset string. 

## ```ThumborProps``` Props
 Propname             | Type                                          | Description
----------------------|-----------------------------------------------| -------------
 url                  | URL                                           | (mandatory) The URL of the Thumbor server. [Learn more.](https://thumbor.readthedocs.io/en/latest/getting_started.html)
 key?                 | string                                        | (optional) The key of the Thumbor server. Optional parameter, if not provided - ```unsafe``` will be used (using ```unsafe``` option not recommended, as secure option with pre-render will probably hide your secret key from thumbor good enough). [Learn more.](https://thumbor.readthedocs.io/en/latest/security.html)
 trim?                | ThumborTrimProps                              | (optional) The trim parameter is used to remove the edges of an image. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#trim)
 crop?                | ThumborCropProps                              | (optional) The crop parameter is used to crop an image. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#manual-crop)
 fit?                 | "fit-in" \| "adaptive-fit-in" \| "full-fit-in" | (optional) The fit parameter is used to fit an image into a given rectangle. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#fit-in) 
 width?               | number  \| "orig"                             | (optional) The width parameter is used to resize an image to a given width. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#image-size)                            
 height?              | number \| "orig"                              | (optional) The height parameter is used to resize an image to a given height. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#image-size)                                         
 flip?                | ThumborFlipProps                              | (optional) The flip parameter is used to flip an image. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#image-size)
 horizontalAlignment? | "left" \| "center" \| "right"                 | (optional) The horizontalAlignment parameter is used to align an image horizontally. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#horizontal-align)           
 verticalAlignment? | "top" \| "middle" \| "bottom" | (optional) The verticalAlignment parameter is used to align an image vertically. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#vertical-align)
smart? | boolean | (optional) The smart parameter is used to enable smart cropping. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#smart-cropping)
filters? | AbstractThumborFilterProp[] | (optional) The filters parameter is used to apply filters to an image. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#filters)

## ```ThumborTrimProps``` Props
 Propname             | Type                                    | Description
----------------------|-----------------------------------------| -------------
trimMode | "top-left" \| "bottom-right" \| "auto" | (mandatory) The trimMode parameter is used to specify the trim mode. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#trim)

## ```ThumborFlipProps``` Props
 Propname             | Type                                  | Description
----------------------|---------------------------------------| -------------
flipMode | "vertical" \| "horizontal" \| "both" | (mandatory) The flipMode parameter is used to specify the flip mode. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html)

## ```ThumborPointProps``` Props
 Propname             | Type                                  | Description
----------------------|---------------------------------------| -------------
x | number | (mandatory) The x parameter is used to specify the x coordinate of a point.
y | number | (mandatory) The y parameter is used to specify the y coordinate of a point.

## ```ThumborCropProps``` Props
 Propname             | Type              | Description
----------------------|-------------------| -------------
topLeft | ThumborPointProps | (mandatory) The topLeft parameter is used to specify the top left point of the crop rectangle.
bottomRight | ThumborPointProps | (mandatory) The bottomRight parameter is used to specify the bottom right point of the crop rectangle.

## ```AbstractThumborFilterProp``` Props
 Propname             | Type                                                                                                                                                                                                                                                                                                                                      | Description                                                                                                                                          
----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------
name | 'contrast' \| 'convolution' \| 'cover' \| 'equalize' \| 'extract_focal' \| 'fill' \| 'focal' \| 'format' \| 'grayscale' \| 'max_bytes' \| 'noise' \| 'no_upscale' \| 'proportion' \| 'quality' \| 'rgb' \| 'rotate' \| 'round_corner' \| 'saturation' \| 'sharpen' \| 'stretch' \| 'strip_exif' \| 'strip_icc' \| 'upscale' \| 'watermark' | (mandatory) The name parameter is used to specify the name of the filter. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#filters) 
...  | dynamic | (mandatory) Depending on the selected filter, you will need to specify a different number of parameters with different property names                | (mandatory) The args parameter is used to specify the arguments of the filter. [Learn more.](https://thumbor.readthedocs.io/en/latest/usage.html#filters)

## All Filters Object Example
```typescript
filters: [
    {
        name: 'autojpg'
    },
    {
        name:'background_color',
        color: '#2bb9a4'
    },
    {
        name: 'blur',
        radius: 10,
        sigma: 3 //optional
    },
    {
        name: 'brightness',
        amount: 50
    },
    {
        name: 'contrast',
        amount: 50
    },
    {
        name:'convolution',
        matrix: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
        columns: 3,
        normalize: false
    },
    {
        name: 'cover'
    },
    {
        name: 'equalize'
    },
    {
        name: 'extract_focal',
        pre: {
            topLeft: {
                x: 100,
                y: 150
            },
            bottomRight: {
                x: 300,
                y: 200
            }
        }
    },
    {
        name: 'fill',
        color: '#2bb9a4',
        fillTransparent: true //optional
    },
    {
        name: 'focal',
        left: 1,
        top: 1,
        right: 1,
        bottom: 1
    },
    {
        name: 'format',
        format: 'webp'
    },
    {
        name: 'grayscale'
    },
    {
        name: 'max_bytes',
        bytes: 1500//<1.5kb
    },
    {
        name: 'no_upscale'
    },
    {
        name: 'noise',
        amount: 50
    },
    {
        name: 'proportion',
        percentage: 100
    },
    {
        name: 'quality',
        amount: 100
    },
    {
        name: 'rgb',
        red: 76,
        green: 5,
        blue: 10
    },
    {
        name: 'rotate',
        amount: 90
    },
    {
        name: "round_corner",
        a: 25,
        b: 2, //optional
        red: 255,
        green: 255,
        blue: 255,
        transparent: true //optional
    },
    {
        name: 'saturation',
        amount: 15
    },
    {
        name: "sharpen",
        amount: 2,
        radius: 1.0,
        luminance: true
    },
    {
        name: 'stretch'
    },
    {
        name: 'strip_exif'
    },
    {
        name: 'strip_icc'
    },
    {
        name: 'upscale'
    },
    {
        name: 'watermark',
        url: 'https://easydigitaldownloads.com/wp-content/uploads/2014/02/edd-download-image-watermark.png',
        xPosition: {
            type: 'repeat',
        },
        yPosition: {
            type: 'repeat',
        },
        alpha: 85,
        wRatio: 15, //optional
        hRatio: 15 //optional
    }
  ]
```

## Goals

Our first goal for this project is to add a simple to use and fully-compatible with Thumbor, image
component, which will handle all the image processing and optimization for you in easy to use way.
With astro-thumbor-image you don't need to construct Thumbor URLs by hand, you just pass the image component.
You don't need to sign the URLs, the component will do it for you. By using more complex components, such as
```<ThumborFallbackImage>``` and ```<ThumborOptimizedImage>``` you can even have the component which will automatically
render a suitable version of image for the user's device and connection speed and availability of source image.

## What does this component do, exactly?

It's a simple collection of components that are essentially a wrappers around ```<img/>``` HTML tag.
Essentially component will take ```src``` and ```thumbor``` properties and build a URL pointing out to Thumbor instance, to
load optimized and transformed version of your image. If you provide a ```key``` property, the component will also
sign the URL for you.

## Acknowledgements

Without the amazing work of the [Astro](https://astro.build) team and [Thumbor](https://www.thumbor.org) team, this project would not be possible.
Many thanks to them! ❤️
