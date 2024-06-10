import { Folder } from "../../domain/models/folder.js";



/**
 * 
 * @param {string} folderDestination 
 */
export function goToFolder(folderDestination) {
    localStorage.setItem("folderId", folderDestination);
}
/**
 * 
 * @param {string} sessionDestination 
 */
export function goToSession(sessionDestination) {
    localStorage.setItem("sessionId", sessionDestination);
}

/**
 * 
 * @param {Folder} currentFolder 
 */
export function goBack(currentFolder) {
    localStorage.setItem("folderId", currentFolder.parentFolder)
}