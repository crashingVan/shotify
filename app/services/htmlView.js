import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { saveFolderId } from "./localStorage.js";
import { Screenshot } from "../models/screenshot.js";
import { createHtmlFolder, loadScreenshot, createHtmlSession, rmBackBtnIfHome, createSidebarElement } from "./htmlElement.js";
import { findFolderById } from "./indexedDb.js";


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
export function createSidebar(folder) {
    var i = 0;
    createSidebarElement(folder);
    goIntoFolder(folder, i);

}

/**
 * 
 * @param {Folder} folder 
 * @param {number} i 
 */
function goIntoFolder(folder) {
    findFolderById(folder.id).then((folder) => {;
        folder.folders.map((folder) => {
            createSidebarElement(folder);
            goIntoFolder(folder);
        })
        folder.sessions.map((session) => {
            createSidebarElement(session);
        })
    })

}



function test() {
    /** @type {Folder} */
    var testFolder;
    var i = 1
    findFolderById('fb6416311-2039-4154-9940-b2bdcdae22f8').then((folder) => {

        console.log("folderfound", folder);
        console.log("testFolder Length", folder.folders.length);
        goIntoFolder(folder, i)
    });
}


/**
 * 
 * @param {string} title 
 */
export function createTitle(title) {
    const titleElement = document.createElement('h1')
    const header = document.getElementById("header");
    titleElement.textContent = title;

    header.classList.add("title");
    header.appendChild(titleElement);
}

/**
 * 
 * @param {string} folderID
 * @param {HTMLElement} btn 
 */
export function btnsView(folderID, btn) {
    rmBackBtnIfHome(folderID, btn)
}
