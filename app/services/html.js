import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { saveFolderId, saveSessionId } from "./localStorage.js";
import { Screenshot } from "../models/screenshot.js";
import { drawImage } from "./canvas.js";

const bigScreenshotWidth = "1000px";
const bigScreenshotHeight = "900px";
const smallVideoWidth = "400px";
const smallVideoHeight = "250px";
const bigVideoWidth = "1000px";
const bigVideoHeight = "900px";


const bigScreenshotWidthNumber = 1000;
const bigScreenshotHeightNumber = 900;



/**
 * 
 * @param {Folder[]} folders
 * @param {Session[]} sessions
 */
export function createFolderView(folders, sessions) {
    folders.map((folder) => createHtmlFolder(folder.name, folder.id));
    sessions.map((session) => createHtmlSession(session.name, session.id));
}

/**
 * 
 * @param {Screenshot[]} screenshots
 *  @param {HTMLDivElement} previewDiv
 */
export function createSessionView(screenshots, previewDiv) {
    screenshots.map((screenshot) => loadScreenshot(screenshot.bitmap, screenshot.id, previewDiv));
}

/**
 * 
 * @param {String} folderId 
 * @param {HTMLElement} button 
 */
export function rmBackBtnIfHome(folderId, button) {
    if (folderId == "home") {
        button.remove()
    }
}

/**
 * 
 * @param {HTMLElement} element 
 */
export function hideElement(element) {

}

/**
 * 
 * @param {string} title 
 */
export function createTitle(title) {
    const titleElement = document.createElement('h1')
    titleElement.textContent = title;
    document.body.appendChild(titleElement);
}


/**
 * 
 * @param {string} name 
 * @param {string} id 
 */
export function createHtmlSession(name, id) {
    const folderPfad = "/app/views/session/session.html";

    const btnSession = document.createElement('button');
    btnSession.textContent = name
    btnSession.id = id;

    const session = document.createElement('a');
    session.href = folderPfad;
    session.id = id;
    session.insertAdjacentElement("afterbegin", btnSession);

    document.body.appendChild(session);
    addEventListenerSaveSessionId(session.id)
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
        )
    })
}

/**
 * 
 * @param {string} sessionId
 */
export function addEventListenerSaveSessionId(sessionId) {
    const btnFolder = document.getElementById(sessionId);
    btnFolder.addEventListener('click', (e) => {
        saveSessionId(sessionId);
    })
}


/**
 * 
 * @param {string} name 
 * @param {string} id
 */
export function createHtmlFolder(name, id) {
    const folderPfad = "/";

    const btnFolder = document.createElement('button');
    btnFolder.textContent = name
    btnFolder.id = id;

    const folder = document.createElement('a');
    folder.href = folderPfad;
    folder.id = id;
    folder.insertAdjacentElement("afterbegin", btnFolder);

    document.body.appendChild(folder);
    addEventListenerSavefolderId(folder.id);
    return folder;
}

/**
 * 
 * @param {string} folderId
 */
function addEventListenerSavefolderId(folderId) {
    const btnFolder = document.getElementById(folderId);
    btnFolder.addEventListener('click', (e) => {
        saveFolderId(folderId);
    })
}

/**
 * 
 * @param {ImageBitmap} bitmap 
 * @param {string} screenshotId
 * @param {HTMLDivElement} previewDiv
 */
export function loadScreenshot(bitmap,bitmapWidth, bitmapHeight, screenshotId, previewDiv) {
    const canvas = document.createElement('canvas');
    canvas.id = screenshotId;
    setElementSize(canvas, bigScreenshotWidth, bigScreenshotHeight)
    previewDiv.insertAdjacentElement("afterbegin", canvas);
    drawImage(bitmap, canvas, bitmapWidth, bitmapHeight, bigScreenshotWidthNumber, bigScreenshotHeightNumber);
    document.body.appendChild(canvas);
}

export function videoPreview() {
    const video = document.getElementById('video');
    setElementSize(video, smallVideoWidth, smallVideoHeight)
}

export function videoMainView() {
    const video = document.getElementById('video');
    setElementSize(video, bigVideoWidth, bigVideoHeight)
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
 * @param {HTMLInputElement} textField 
 */
export function removeTextField(textField) {
    textField.remove();
}
