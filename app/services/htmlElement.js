import { calcScreenshotWidthHeight } from "./calc.js";
import { drawImage } from "./canvas.js";
import { saveSessionId, saveFolderId } from "./localStorage.js";

export var smallVideoWidth = "200px";
export var smallVideoHeight = "200px";
export var bigVideoWidth = "800px";
export var bigVideoHeight = "800px";

/**
 *
 * @param {string} name
 * @param {string} id
 */
export function createHtmlSession(name, id) {
    const folderPfad = "/app/views/session/session.html";

    const btnSession = document.createElement('button');
    btnSession.textContent = name;
    btnSession.id = id;

    const session = document.createElement('a');
    session.href = folderPfad;
    session.id = id;
    session.insertAdjacentElement("afterbegin", btnSession);

    document.body.appendChild(session);
    btnSession.addEventListener('click', (e) => {
        saveSessionId(session.id);
    });

}

export function createTextField() {
    const textField = document.createElement('input');
    textField.type = "text";
    textField.id = "textField";
    textField.placeholder = "name";
    document.body.appendChild(textField);
    return textField;
}

/**
 *
 * @param {string} name
 * @param {string} id
 */
export function createHtmlFolder(name, id) {
    const folderPfad = "/";

    const btnFolder = document.createElement('button');
    btnFolder.textContent = name;
    btnFolder.id = id;

    const folder = document.createElement('a');
    folder.href = folderPfad;
    folder.id = id;
    folder.insertAdjacentElement("afterbegin", btnFolder);

    document.body.appendChild(folder);
    btnFolder.addEventListener('click', (e) => {
        saveFolderId(folder.id)
    });    
        return folder;
}

/**
 *
 * @param {HTMLInputElement} textField
 */
export function addEventListenerReadInput(textField) {
    return new Promise((resolve) => {
        textField.addEventListener("change", (e) => {
            //@ts-ignore
            console.log(document.getElementById(textField.id).value);
            //@ts-ignore
            resolve(document.getElementById(textField.id).value);
        }
        );
    });
}


/**
 *
 * @param {ImageBitmap} bitmap
 * @param {string} screenshotId
 * @param {HTMLDivElement} previewDiv
 */
export function loadScreenshot(bitmap, screenshotId, previewDiv) {
    console.log(visualViewport.height);
    console.log(window.innerHeight);

    const canvas = document.createElement('canvas');
    canvas.id = screenshotId;


    //canvas.classList.add("screen");
    // const bigScreenshotWidth = calcBitmapWidthHeightRatio(bitmap.width, bitmap.height)*bigScreenshotHeight
   const {width, height} = calcScreenshotWidthHeight(bitmap);
    setElementSize(canvas, `${width}`, `${height}`);
    drawImage(bitmap, canvas, bitmap.width, bitmap.height, canvas.width, canvas.height);
    //document.body.appendChild(canvas);
    previewDiv.appendChild(canvas);
}

/**
 *
 * @param {String} folderId
 * @param {HTMLElement} button
 */
export function rmBackBtnIfHome(folderId, button) {
    if (folderId == "home") {
        button.remove();
    }
}

/**
 *
 * @param {HTMLInputElement} textField
 */
export function removeTextField(textField) {
    textField.remove();
}

/**
 *
 * @param {HTMLElement} element
 */
export function hideElement(element) {
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

