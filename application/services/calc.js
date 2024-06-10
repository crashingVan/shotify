/**
 * 
 * @param {number} imageBitmapWidth 
 * @param {number} imageBitmapHeight 
 */
export function calcBitmapWidthHeightRatio (imageBitmapWidth, imageBitmapHeight) {
    const ratio = imageBitmapWidth/imageBitmapHeight;
    return ratio
}

export function calcWindowWidthHeightRatio() {
    const ratio = window.innerWidth/window.innerHeight;
    return ratio
}

//if ratio >1, then the width of the imageBitmap is of a bigger factor then of the window bigger then the height
export function compareWindowRatioBitmapRatio(imageBitmapWidth, imageBitmapHeight) {
    const ratio = calcBitmapWidthHeightRatio(imageBitmapWidth, imageBitmapHeight) / calcWindowWidthHeightRatio();
    console.log(ratio);
    if (ratio > 1) {
        return 0;
    }
    else if (ratio < 1) {
        return 1;
    }
    else {
        return 2;
    }

}

/**
 *
 * @param {ImageBitmap} bitmap
 */
export function calcScreenshotWidthHeight(bitmap) {
    var bigScreenshotHeight;
    var bigScreenshotWidth;
    if (compareWindowRatioBitmapRatio(bitmap.width, bitmap.height) == 0) {
        bigScreenshotWidth = window.innerWidth * 0.95;
        bigScreenshotHeight = bigScreenshotWidth * calcBitmapWidthHeightRatio(bitmap.width, bitmap.height);
        return { width: bigScreenshotWidth, height: bigScreenshotHeight };
    }
    else if (compareWindowRatioBitmapRatio(bitmap.width, bitmap.height) == 1) {
        bigScreenshotHeight = window.innerHeight * 0.95;
        bigScreenshotWidth = bigScreenshotHeight * calcBitmapWidthHeightRatio(bitmap.width, bitmap.height);
        return { width: bigScreenshotWidth, height: bigScreenshotHeight };
    }
}

