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