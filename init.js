
import { loadFoldersAndSessions, loadSidebar, loadTitle, rmBackBtnIfHome } from "./application/services/htmlElement.js";
import { initDB } from "./infrastructure/db/initIndexedDb.js";
import { findFolderById } from "./infrastructure/db/folderDb.js";
import { getCurrentFolderId } from "./application/services/localStorage.js";
import { HomeFolder } from "./domain/models/homeFolder.js";
import { Folder } from "./domain/models/folder.js";
import { backBtn } from "./ui/interface.js";

/** @type {IDBDatabase} */
export let db;
/**@type {string} */
export let currentFolderId;
/**@type {Folder} */
export let currentFolder;
/** @type {HomeFolder} */
export let homeFolder;

export const folderPfad = "/";
export const sessionPfad = "/app/views/session/session.html";
export const iconSpaceStyle = "iconSpace"
export const sidebarStyle = "sidebar"



window.onpageshow = () => {
    currentFolderId = getCurrentFolderId();

    initDB().then((/**@type {IDBDatabase}*/ database) => {
        db = database
        findFolderById("home").then((/** @type {HomeFolder} */foundHomeFolder) => {
            homeFolder = foundHomeFolder;
            loadSidebar();
        })
        findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
            currentFolder = foundFolder;
            console.log("current Folder ", currentFolder);
            initInterface();

        })
    })
}

 function initInterface() {
    rmBackBtnIfHome(currentFolder.id, backBtn);
    loadTitle(currentFolder.name);
    loadFoldersAndSessions(currentFolder, folderPfad, sessionPfad);
    loadSidebar();
}



