import { Folder } from "../../models/folder.js";
import { createFolderSessionView } from "../../services/html.js";
import { findCurrentFolderById, initDB } from "../../services/indexedDb.js";
import { rmFolderIdFromLocalStorage } from "../../services/localStorage.js";




let currentFolderId = localStorage.getItem("folderId");

rmFolderIdFromLocalStorage();
initDB().then((e) => initFolderView(currentFolderId));
console.log();


/**
 * 
 * @param {string} currentFolderId 
 */
function initFolderView(currentFolderId) {
    findCurrentFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        createFolderSessionView(foundFolder.folders, foundFolder.sessions)
    })
}

