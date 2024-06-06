import { setElementSize } from "./canvas";

import { calcScreenshotWidthHeight } from "./calc";
import { smallVideoWidth, smallVideoHeight, bigVideoWidth, bigVideoHeight } from "./htmlElement";

/**
 * 
 * @param {ImageBitmap} image 
 * @param {HTMLCanvasElement} canvas 
 * @param {number} scWidht 
 * @param {number} scHeight 
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 */
export function drawImage(image, canvas, scWidht, scHeight, canvasWidth, canvasHeight) {
    canvas.getContext("2d").drawImage(image, 0, 0, scWidht, scHeight, 0, 0, canvasWidth, canvasHeight);
}
/**
 *
 * @param {ImageBitmap} bitmap
 * @param {string} screenshotId
 * @param {HTMLDivElement} previewDiv
 */


export function loadScreenshot(bitmap, screenshotId, previewDiv) {
    const canvas = document.createElement('canvas');
    canvas.id = screenshotId;


    //canvas.classList.add("screen");
    // const bigScreenshotWidth = calcBitmapWidthHeightRatio(bitmap.width, bitmap.height)*bigScreenshotHeight
    const { width, height } = calcScreenshotWidthHeight(bitmap);
    setElementSize(canvas, `${width}`, `${height}`);
    drawImage(bitmap, canvas, bitmap.width, bitmap.height, canvas.width, canvas.height);
    //document.body.appendChild(canvas);
    previewDiv.appendChild(canvas);
}
export function videoPreview() {
    const video = document.getElementById('video');
    setElementSize(video, smallVideoWidth, smallVideoHeight);
}

export function videoMainView() {
    const video = document.getElementById('video');
    setElementSize(video, bigVideoWidth, bigVideoHeight);
}
/**
 *
 * @param {string} width
 * @param {string} height
 * @param {HTMLElement} element
 */


export function setElementSize(element, width, height) {
    element.setAttribute("width", width);
    element.setAttribute("height", height);
}

