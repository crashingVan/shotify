import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { Screenshot } from "../models/screenshot.js";
import { rmBackBtnIfHome, createSidebarElement, createFolder, createSession } from "./htmlElement.js";
import { loadScreenshot } from "./canvas.js";
import { findFolderById } from "./indexedDb.js";
import { HomeFolder } from "../models/homeFolder.js";


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
 * @param {string} pfadFolder
 * @param {string} pfadSession
 * 
 */
export function loadFoldersAndSessions(folders, sessions, pfadFolder, pfadSession) {
    folders.map((folder) => createFolder(folder.name, folder.id, pfadFolder, document.getElementById("iconSpace"), folder.objectType, "iconSpace"));
    sessions.map((session) => createSession(session.name, session.id, pfadSession, document.getElementById("iconSpace"), session.objectType, "iconSpace"));
}

/**
 * 
 * @param {Screenshot[]} screenshots
 *  @param {HTMLDivElement} previewDiv
 */
export function loadPreview(screenshots, previewDiv) {
    screenshots.map((screenshot) => loadScreenshot(screenshot.bitmap, screenshot.id, previewDiv));
}

/**
 * 
 * @param {Folder|HomeFolder} folder
 */
export function loadSidebar(folder) {
    createSidebarElement(folder);
    loadItemsOf(folder);

}

/**
 * 
 * @param {Folder} folder 
 */
function loadItemsOf(folder) {
    findFolderById(folder.id).then((folder) => {
        ;
        folder.folders.map((folder) => {
            createSidebarElement(folder);
            loadItemsOf(folder);
        })
        folder.sessions.map((session) => {
            createSidebarElement(session);
        })
    })

}

/**
 * 
 * @param {string} title 
 */
export function loadTitle(title) {
    const titleElement = document.createElement('h1')
    const header = document.getElementById("header");
    titleElement.textContent = title;

    titleElement.classList.add("title");
    header.appendChild(titleElement);
}

/**
 * 
 * @param {string} folderID
 * @param {HTMLElement} backBtn 
 */
export function loadBtns(folderID, backBtn, addBtn) {
    rmBackBtnIfHome(folderID, backBtn);
}
