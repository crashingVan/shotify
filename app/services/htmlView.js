import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { saveFolderId } from "./localStorage.js";
import { Screenshot } from "../models/screenshot.js";
import { createHtmlFolder, loadScreenshot, createHtmlSession, rmBackBtnIfHome  } from "./htmlElement.js";


export var bigScreenshotWidth;
export var bigScreenshotHeight;

export var smallVideoWidth = "200px";
export var smallVideoHeight = "200px";
export var bigVideoWidth = "800px";
export var bigVideoHeight = "800px";




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
 * @param {Folder} folder 
 */
export function createSideBar(folder) {
    const div = document.createElement('div');
    const toggelBtn = document.createElement('button');
    const folderBtn = document.createElement('button');
    const sidebar = document.getElementById('sidebar');
    const folderLink = document.createElement('a');

    folderLink.href = "/";
    folderBtn.textContent = folder.name;
    folderBtn.id = folder.id;

    folderBtn.addEventListener("click", (e) => saveFolderId(folder.id))

    folderLink.appendChild(folderBtn)
    div.appendChild(toggelBtn);
    div.appendChild(folderLink);
    sidebar.appendChild(div);


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
 * @param {string} folderID
 * @param {HTMLElement} btn 
 */
export function btnsView(folderID, btn) {
    rmBackBtnIfHome(folderID, btn)
}
